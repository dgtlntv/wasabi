import { inColorGamut } from "../../General/inColorGamut"
import annealLightnessChroma from "./annealLightnessChroma"
import calcShadesHue0 from "../calcShadesHue0"
import calcApca from "../../Contrast/calcApca"
import { formatCss } from "culori"

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
    targetColorGamut,
    counterObject
) {
    if (secondaryColor["h"] === undefined) {
        return calcShadesHue0(primaryShades, lightBg, darkBg, targetColorGamut)
    }

    const minHue = secondaryColor["h"] - hueTolerance
    const maxHue = secondaryColor["h"] + hueTolerance

    let currentSecondaryShades = calcShades(
        primaryShades,
        secondaryColor["h"],
        lightBg,
        darkBg,
        lightnessTolerance,
        chromacityTolerance,
        T,
        T_min,
        alpha,
        targetColorGamut,
        counterObject
    )

    let bestSecondaryShades = [...currentSecondaryShades]
    let currentEnergy = energy(currentSecondaryShades, primaryShades)

    while (T > T_min) {
        let newHue = perturb(currentSecondaryShades[0].color["h"], minHue, maxHue)
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
            targetColorGamut,
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
    targetColorGamut,
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
            targetColorGamut,
            counterObject
        )
        const optimalContrast = Math.abs(calcApca(optimalShade, primaryShade.isDark ? lightBg : darkBg, targetColorGamut))

        shades.push({
            color: optimalShade,
            colorCss: formatCss(optimalShade),
            name: primaryShade.name,
            isDark: primaryShade.isDark,
            colorGamut: inColorGamut(optimalShade),
            contrastValue: optimalContrast,
        })
    }

    return shades
}

function energy(currentSecondaryShades, primaryShades) {
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
