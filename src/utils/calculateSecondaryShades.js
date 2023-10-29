import { calcAPCA } from "apca-w3"
import hexToOklch from "./hexToOklch"
import { inColorGamut } from "./inColorGamut"
import oklchArrayToCss from "./oklchArrayToCss"
import oklchArrayToHex from "./oklchArrayToHex"

function energy(testShade, primaryShade, lightBg, darkBg, targetContrast) {
    let testContrast = Math.abs(calcAPCA(oklchArrayToHex(testShade), primaryShade.isDark ? lightBg : darkBg))
    const inGamut = inColorGamut(oklchArrayToCss(testShade))

    return inGamut && testContrast === targetContrast ? 0 : Math.abs(targetContrast - testContrast)
}

function perturb(currentShade, lightnessTolerance, chromacityTolerance) {
    const lightness = currentShade[0]
    const chroma = currentShade[1]

    // Generate random perturbations within the tolerance range
    const deltaLightness = (Math.random() - 0.5) * lightnessTolerance
    const deltaChroma = (Math.random() - 0.5) * chromacityTolerance

    // Update lightness and chroma with constrained perturbations
    const newLightness = lightness + deltaLightness
    const newChroma = chroma + deltaChroma

    return [
        Math.min(Math.max(newLightness, 0), 100), // Constrain between 0 and 100
        Math.min(Math.max(newChroma, 0), 128), // Constrain between 0 and 128
        currentShade[2],
    ]
}

// Simulated Annealing function
function simulatedAnnealing(
    primaryShade,
    secondaryColorOKLCH,
    lightBg,
    darkBg,
    targetContrast,
    lightnessTolerance,
    chromacityTolerance,
    T,
    T_min,
    alpha
) {
    let currentShade = [primaryShade.color[0], primaryShade.color[1], secondaryColorOKLCH["h"]]
    let bestShade = [...currentShade]
    let currentEnergy = energy(currentShade, primaryShade, lightBg, darkBg, targetContrast)

    while (T > T_min) {
        let newShade = perturb(currentShade, lightnessTolerance, chromacityTolerance)
        let newEnergy = energy(newShade, primaryShade, lightBg, darkBg, targetContrast)

        if (newEnergy < currentEnergy || Math.exp((currentEnergy - newEnergy) / T) > Math.random()) {
            currentShade = [...newShade]
            currentEnergy = newEnergy
        }

        if (currentEnergy < energy(bestShade, primaryShade, lightBg, darkBg, targetContrast)) {
            bestShade = [...currentShade]
        }

        T = T * alpha
    }

    return bestShade
}

export default function calculateSecondaryShades(
    primaryShades,
    secondaryColor,
    lightBg,
    darkBg,
    lightnessTolerance,
    chromacityTolerance,
    targetColorGamut
) {
    const secondaryColorOKLCH = hexToOklch(secondaryColor)
    const secondaryShades = []

    for (const [index, primaryShade] of Object.entries(primaryShades)) {
        const optimalShade = simulatedAnnealing(
            primaryShade,
            secondaryColorOKLCH,
            lightBg,
            darkBg,
            primaryShade.contrastValue,
            lightnessTolerance,
            chromacityTolerance,
            100.0, // Initial temperature
            0.001, // Minimum temperature
            0.001 // Alpha (cooling rate)
        )
        const optimalContrast = Math.abs(calcAPCA(oklchArrayToHex(optimalShade), primaryShade.isDark ? lightBg : darkBg))

        secondaryShades.push({
            color: optimalShade,
            colorCss: oklchArrayToCss(optimalShade),
            name: primaryShade.name,
            isDark: primaryShade.isDark,
            colorGamut: inColorGamut(oklchArrayToHex(optimalShade)),
            contrastValue: optimalContrast,
        })
    }

    return secondaryShades
}
