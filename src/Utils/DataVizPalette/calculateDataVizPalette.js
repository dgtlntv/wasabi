import averageDeltaEOfOklchArray from "../averageDeltaEOfOklchArray"
import averageDeltaEOfColorblindness from "../averageDeltaEOfColorblindness"
import averageContrastToBg from "../averageContrastToBg"
import averageContrastColorsArray from "../averageContrastColorsArray"
import oklchArrayToCss from "../oklchArrayToCss"
import { inColorGamut } from "../../Utils/inColorGamut"

export default function calculateDataVizPalette(
    lightBg,
    darkBg,
    primaryColorOKLCH,
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
    let currentPalette = [...generateRandomColors(primaryColorOKLCH, amountOfColors)]
    let bestPalette = [...currentPalette]
    let currentEnergy = energy(currentPalette, spread, colorblindness, contrast, lightBg)

    while (T > T_min) {
        let newPalette = perturb(currentPalette, perturbOptions)
        let newEnergy = energy(newPalette, spread, colorblindness, contrast, lightBg)

        if (newEnergy < currentEnergy || Math.exp((currentEnergy - newEnergy) / T) > Math.random()) {
            currentPalette = [...newPalette]
            currentEnergy = newEnergy
        }

        if (currentEnergy < energy(bestPalette, spread, colorblindness, contrast, lightBg)) {
            bestPalette = [...currentPalette]
        }

        T = T * alpha
    }

    const dataVizObjArray = []

    bestPalette.forEach((color) => {
        dataVizObjArray.push({
            colorCss: oklchArrayToCss(color),
            color: [color[0], color[1], color[2]],
            colorGamut: inColorGamut(oklchArrayToCss(color)),
        })
    })

    return dataVizObjArray
}

function energy(colorArray, spread, colorblindness, contrast, lightBg) {
    const averageDistance = averageDeltaEOfOklchArray(colorArray)
    const averageProtanopiaDistance = averageDeltaEOfColorblindness(colorArray, "Protanopia")
    const averageDeuteranopiaDistance = averageDeltaEOfColorblindness(colorArray, "Deuteranopia")
    const averageTritanopiaDistance = averageDeltaEOfColorblindness(colorArray, "Tritanopia")
    const averageContrastToBackground = averageContrastToBg(colorArray, lightBg)
    const averageContrastBetweenColors = averageContrastColorsArray(colorArray)

    const energy =
        averageDistance * spread +
        averageProtanopiaDistance * colorblindness +
        averageDeuteranopiaDistance * colorblindness +
        averageTritanopiaDistance * colorblindness +
        averageContrastToBackground * contrast +
        averageContrastBetweenColors * contrast

    return energy
}

function perturb(colorArray, perturbOptions) {
    let newArray = [...colorArray]

    if (perturbOptions[0] === true) {
        newArray.forEach((color, i) => {
            if (i === 0) return

            const deltaLightness = (Math.random() - 0.5) * 0.01
            let newLightness = color[0] + deltaLightness
            newArray[i] = [Math.max(0, Math.min(1, newLightness)), color[1], color[2]]
        })
    }

    if (perturbOptions[1] === true) {
        colorArray.forEach((color, i) => {
            if (i === 0) return

            const deltaChroma = (Math.random() - 0.5) * 0.01
            let newChroma = color[0] + deltaChroma
            newArray[i] = [Math.max(0, Math.min(1, newChroma)), color[1], color[2]]
        })
    }

    if (perturbOptions[2] === true) {
        colorArray.forEach((color, i) => {
            if (i === 0) return

            const deltaHue = (Math.random() - 0.5) * 0.01
            let newHue = color[0] + deltaHue
            newArray[i] = [color[0], color[1], Math.max(0, Math.min(360, newHue))]
        })
    }

    return newArray
}

function generateRandomColors(primaryColor, numberOfColors) {
    let colorArray = [[primaryColor["l"], primaryColor["c"], primaryColor["h"]]]

    for (let index = 0; index < numberOfColors; index++) {
        const newColor = [primaryColor["l"], primaryColor["c"], Math.floor(Math.random() * 360)]
        colorArray.push(newColor)
    }

    return colorArray
}
