import averageDeltaEOfOklchArray from "./averageDeltaEOfOklchArray"
import averageDeltaEOfColorblindness from "./averageDeltaEOfColorblindness"
import averageContrastToBg from "./averageContrastToBg"
import averageContrastColorsArray from "./averageContrastColorsArray"
import { inColorGamut } from "../Misc/inColorGamut"
import { formatCss } from "culori"

export default function calculateDataVizPalette(
    lightBg,
    darkBg,
    primaryColor,
    targetColorGamut,
    spread,
    colorblindness,
    contrast,
    T,
    T_min,
    alpha,
    perturbOptions,
    amountOfColors
) {
    let currentPalette = [...generateRandomColors(primaryColor, amountOfColors)]
    let bestPalette = [...currentPalette]
    let currentEnergy = energy(currentPalette, spread, colorblindness, contrast, lightBg, targetColorGamut)

    while (T > T_min) {
        let newPalette = perturb(currentPalette, perturbOptions)
        let newEnergy = energy(newPalette, spread, colorblindness, contrast, lightBg, targetColorGamut)

        if (newEnergy < currentEnergy || Math.exp((currentEnergy - newEnergy) / T) > Math.random()) {
            currentPalette = [...newPalette]
            currentEnergy = newEnergy
        }

        if (currentEnergy < energy(bestPalette, spread, colorblindness, contrast, lightBg, targetColorGamut)) {
            bestPalette = [...currentPalette]
        }

        T = T * alpha
    }

    const dataVizObjArray = []

    bestPalette.forEach((color) => {
        dataVizObjArray.push({
            colorCss: formatCss(color),
            color: color,
            colorGamut: inColorGamut(color),
        })
    })

    return dataVizObjArray
}

function energy(palette, spread, colorblindness, contrast, lightBg, targetColorGamut) {
    const averageDistance = averageDeltaEOfOklchArray(palette)
    const averageProtanopiaDistance = averageDeltaEOfColorblindness(palette, "Protanopia")
    const averageDeuteranopiaDistance = averageDeltaEOfColorblindness(palette, "Deuteranopia")
    const averageTritanopiaDistance = averageDeltaEOfColorblindness(palette, "Tritanopia")
    const averageContrastToBackground = averageContrastToBg(palette, lightBg, targetColorGamut)
    const averageContrastBetweenColors = averageContrastColorsArray(palette, targetColorGamut)

    const energy =
        averageDistance * spread +
        averageProtanopiaDistance * colorblindness +
        averageDeuteranopiaDistance * colorblindness +
        averageTritanopiaDistance * colorblindness +
        averageContrastToBackground * contrast +
        averageContrastBetweenColors * contrast

    return energy
}

function perturb(palette, perturbOptions) {
    let newPalette = [...palette]

    if (perturbOptions[0] === true) {
        newPalette.forEach((color, i) => {
            if (i === 0) return

            const deltaLightness = (Math.random() - 0.5) * 0.01
            let newLightness = color["l"] + deltaLightness
            newPalette[i] = { ...color, l: Math.max(0, Math.min(1, newLightness)) }
        })
    }

    if (perturbOptions[1] === true) {
        palette.forEach((color, i) => {
            if (i === 0) return

            const deltaChroma = (Math.random() - 0.5) * 0.01
            let newChroma = color["c"] + deltaChroma
            newPalette[i] = { ...color, c: Math.max(0, Math.min(1, newChroma)) }
        })
    }

    if (perturbOptions[2] === true) {
        palette.forEach((color, i) => {
            if (i === 0) return

            const deltaHue = (Math.random() - 0.5) * 3
            let newHue = color["h"] + deltaHue
            newPalette[i] = { ...color, h: Math.max(0, Math.min(360, newHue)) }
        })
    }

    return newPalette
}

function generateRandomColors(primaryColor, numberOfColors) {
    let arrayOfRandomColors = [primaryColor]

    // TODO: maybe I should also make the other channels random based on the perturb options?

    for (let index = 0; index < numberOfColors; index++) {
        arrayOfRandomColors.push({ ...primaryColor, h: Math.floor(Math.random() * 360) })
    }

    return arrayOfRandomColors
}
