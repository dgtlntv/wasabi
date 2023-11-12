import { inColorGamut } from "../../inColorGamut"
import oklchArrayToHex from "../../oklchArrayToHex"
import { calcAPCA } from "apca-w3"

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
    counterObject
) {
    const minLightness = primaryShade.color[0] - lightnessTolerance
    const maxLightness = primaryShade.color[0] + lightnessTolerance
    const minChroma = primaryShade.color[1] - chromacityTolerance
    const maxChroma = primaryShade.color[1] + chromacityTolerance

    let currentShade = [primaryShade.color[0], primaryShade.color[1], hue]
    let bestShade = [...currentShade]
    let currentEnergy = energy(currentShade, primaryShade, lightBg, darkBg, targetContrast)

    while (T > T_min) {
        let newShade = perturb(currentShade, minLightness, maxLightness, minChroma, maxChroma)
        let newEnergy = energy(newShade, primaryShade, lightBg, darkBg, targetContrast)

        if (newEnergy < currentEnergy || Math.exp((currentEnergy - newEnergy) / T) > Math.random()) {
            currentShade = [...newShade]
            currentEnergy = newEnergy
        }

        if (currentEnergy < energy(bestShade, primaryShade, lightBg, darkBg, targetContrast)) {
            bestShade = [...currentShade]
        }

        T = T * alpha

        counterObject.value++
    }

    return bestShade
}

function energy(testShade, primaryShade, lightBg, darkBg, targetContrast) {
    let testContrast = Math.abs(calcAPCA(oklchArrayToHex(testShade), primaryShade.isDark ? lightBg : darkBg))
    const inGamut = inColorGamut(oklchArrayToHex(testShade))

    return inGamut && testContrast === targetContrast ? 0 : Math.abs(targetContrast - testContrast)
}

function perturb(currentShade, minLightness, maxLightness, minChroma, maxChroma) {
    const lightness = currentShade[0]
    const chroma = currentShade[1]

    const deltaLightness = (Math.random() - 0.5) * 0.01
    const deltaChroma = (Math.random() - 0.5) * 0.01

    const newLightness = lightness + deltaLightness
    const newChroma = Math.max(0.01, chroma + deltaChroma)

    return [
        Math.max(minLightness, Math.min(maxLightness, newLightness)),
        Math.max(minChroma, Math.min(maxChroma, newChroma)),
        currentShade[2],
    ]
}
