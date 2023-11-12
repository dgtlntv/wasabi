import deltaEOklch from "./deltaEOklch"

export default function averageDeltaEOfOklchArray(palette) {
    let totalDistance = 0
    let comparisons = 0

    for (let i = 0; i < palette.length; i++) {
        for (let j = i + 1; j < palette.length; j++) {
            totalDistance += deltaEOklch(palette[i], palette[j])
            comparisons++
        }
    }

    return comparisons > 0 ? totalDistance / comparisons : 0
}
