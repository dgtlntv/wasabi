import { calcAPCA } from "apca-w3"

// I will probably need to convert the oklcharray first for calcApca

export default function averageContrastColorsArray(colorArray) {
    let totalDistance = 0
    let comparisons = 0

    for (let i = 0; i < colorArray.length; i++) {
        for (let j = i + 1; j < colorArray.length; j++) {
            totalDistance += calcAPCA(colorArray[i], colorArray[j])
            comparisons++
        }
    }

    return comparisons > 0 ? totalDistance / comparisons : 0
}
