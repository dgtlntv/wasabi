import deltaEOklch from "./deltaEOklch"

export default function averageDeltaEOfOklchArray(colorArray) {
    let totalDistance = 0
    let comparisons = 0

    for (let i = 0; i < colorArray.length; i++) {
        for (let j = i + 1; j < colorArray.length; j++) {
            totalDistance += deltaEOklch(colorArray[i], colorArray[j])
            comparisons++
        }
    }

    return comparisons > 0 ? totalDistance / comparisons : 0
}
