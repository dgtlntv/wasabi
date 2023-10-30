import { calcAPCA } from "apca-w3"
import { inColorGamut } from "../inColorGamut"
import oklchArrayToCss from "../oklchArrayToCss"
import oklchArrayToHex from "../oklchArrayToHex"
import hexToOklch from "../hexToOklch"
import annealLightnessChroma from "./annealLightnessChroma"
import calcShadesHue0 from "../calcShadesHue0"

export default function annealHue(
    primaryShades,
    secondaryColor,
    lightBg,
    darkBg,
    lightnessTolerance,
    chromacityTolerance,
    hueTolerance,
    T,
    T_min,
    alpha,
    counterObject
) {
    const secondaryColorOKLCH = hexToOklch(secondaryColor)

    if (secondaryColorOKLCH["h"] === undefined) {
        return calcShadesHue0(primaryShades, lightBg, darkBg)
    }

    const minHue = secondaryColorOKLCH["h"] - hueTolerance
    const maxHue = secondaryColorOKLCH["h"] + hueTolerance

    let currentSecondaryShades = calcShades(
        primaryShades,
        secondaryColorOKLCH["h"],
        lightBg,
        darkBg,
        lightnessTolerance,
        chromacityTolerance,
        T,
        T_min,
        alpha,
        counterObject
    )

    let bestSecondaryShades = [...currentSecondaryShades]
    let currentEnergy = energy(currentSecondaryShades, primaryShades)

    while (T > T_min) {
        let newHue = perturb(currentSecondaryShades[0].color[2], minHue, maxHue)
        let newShades = calcShades(
            primaryShades,
            newHue,
            lightBg,
            darkBg,
            lightnessTolerance,
            chromacityTolerance,
            T,
            T_min,
            alpha,
            counterObject
        )
        let newEnergy = energy(newShades, primaryShades)

        if (newEnergy < currentEnergy || Math.exp((currentEnergy - newEnergy) / T) > Math.random()) {
            currentSecondaryShades = [...newShades]
            currentEnergy = newEnergy
        }

        if (currentEnergy < energy(bestSecondaryShades, primaryShades)) {
            bestSecondaryShades = [...currentSecondaryShades]
        }

        T = T * alpha
    }

    return bestSecondaryShades
}

function calcShades(
    primaryShades,
    hue,
    lightBg,
    darkBg,
    lightnessTolerance,
    chromacityTolerance,
    T,
    T_min,
    alpha,
    counterObject
) {
    const shades = []

    for (const [index, primaryShade] of Object.entries(primaryShades)) {
        const optimalShade = annealLightnessChroma(
            primaryShade,
            hue,
            lightBg,
            darkBg,
            primaryShade.contrastValue,
            lightnessTolerance,
            chromacityTolerance,
            T,
            T_min,
            alpha,
            counterObject
        )

        const optimalContrast = Math.abs(calcAPCA(oklchArrayToHex(optimalShade), primaryShade.isDark ? lightBg : darkBg))

        shades.push({
            color: optimalShade,
            colorCss: oklchArrayToCss(optimalShade),
            name: primaryShade.name,
            isDark: primaryShade.isDark,
            colorGamut: inColorGamut(oklchArrayToHex(optimalShade)),
            contrastValue: optimalContrast,
        })
    }

    return shades
}

function energy(currentSecondaryShades, primaryShades) {
    if (currentSecondaryShades.length !== primaryShades.length) {
        throw new Error("The lengths of currentSecondaryShades and primaryShades must be the same.")
    }

    let totalDivergence = 0
    let allInGamut = true

    for (let i = 0; i < currentSecondaryShades.length; i++) {
        const currentShade = currentSecondaryShades[i]
        const primaryShade = primaryShades[i]

        if (!currentShade.colorGamut) {
            allInGamut = false
        }

        const divergence = Math.abs(currentShade.contrastValue - primaryShade.contrastValue)
        totalDivergence += divergence
    }

    return allInGamut && totalDivergence === 0 ? 0 : totalDivergence
}

function perturb(currentHue, minHue, maxHue) {
    const deltaHue = (Math.random() - 0.5) * 3
    let newHue = currentHue + deltaHue

    return Math.max(minHue, Math.min(maxHue, newHue))
}
