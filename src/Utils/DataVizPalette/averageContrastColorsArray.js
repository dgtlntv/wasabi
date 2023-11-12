import calcApca from "../Contrast/calcApca"

export default function averageContrastColorsArray(palette, targetColorGamut) {
    let totalDistance = 0
    let comparisons = 0

    for (let i = 0; i < palette.length; i++) {
        for (let j = i + 1; j < palette.length; j++) {
            totalDistance += calcApca(palette[i], palette[j], targetColorGamut)
            comparisons++
        }
    }

    return comparisons > 0 ? totalDistance / comparisons : 0
}
