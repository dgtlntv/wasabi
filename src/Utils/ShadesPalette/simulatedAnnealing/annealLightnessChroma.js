import calcApca from "../../Contrast/calcApca"
import { inColorGamut } from "../../General/inColorGamut"

export default function annealLightnessChroma(
    primaryShade,
    hue,
    lightBg,
    darkBg,
    targetContrast,
    lightnessTolerance,
    chromacityTolerance,
    T,
    T_min,
    alpha,
    targetColorGamut,
    counterObject
) {
    const minLightness = primaryShade.color["l"] - lightnessTolerance
    const maxLightness = primaryShade.color["l"] + lightnessTolerance
    const minChroma = primaryShade.color["c"] - chromacityTolerance
    const maxChroma = primaryShade.color["c"] + chromacityTolerance

    let currentShade = { ...primaryShade.color, h: hue }
    let bestShade = { ...currentShade }
    let currentEnergy = energy(currentShade, primaryShade, lightBg, darkBg, targetContrast, targetColorGamut)

    while (T > T_min) {
        let newShade = perturb(currentShade, minLightness, maxLightness, minChroma, maxChroma)
        let newEnergy = energy(newShade, primaryShade, lightBg, darkBg, targetContrast, targetColorGamut)

        if (newEnergy < currentEnergy || Math.exp((currentEnergy - newEnergy) / T) > Math.random()) {
            currentShade = { ...newShade }
            currentEnergy = newEnergy
        }

        if (currentEnergy < energy(bestShade, primaryShade, lightBg, darkBg, targetContrast, targetColorGamut)) {
            bestShade = { ...currentShade }
        }

        T = T * alpha

        counterObject.value++
    }

    return bestShade
}

function energy(testShade, primaryShade, lightBg, darkBg, targetContrast, targetColorGamut) {
    let testContrast = Math.abs(calcApca(testShade, primaryShade.isDark ? lightBg : darkBg, targetColorGamut))
    const inGamut = inColorGamut(testShade)

    return inGamut === targetColorGamut && testContrast === targetContrast
        ? 0
        : inGamut === "outside"
        ? 100000
        : Math.abs(targetContrast - testContrast)
}

function perturb(currentShade, minLightness, maxLightness, minChroma, maxChroma) {
    const deltaLightness = (Math.random() - 0.5) * 0.01
    const deltaChroma = (Math.random() - 0.5) * 0.01

    const newLightness = currentShade["l"] + deltaLightness
    const newChroma = Math.max(0.01, currentShade["c"] + deltaChroma)

    return {
        ...currentShade,
        l: Math.max(minLightness, Math.min(maxLightness, newLightness)),
        c: Math.max(minChroma, Math.min(maxChroma, newChroma)),
    }
}
