import deltaERgb from "./deltaERgb"
import { Protanopia, Deuteranopia, Tritanopia } from "./Brettel/brettelFunctions"

export default function averageDeltaEOfColorblindness(palette, colorblindness) {
    let totalDistance = 0
    let comparisons = 0

    for (let i = 0; i < palette.length; i++) {
        for (let j = i + 1; j < palette.length; j++) {
            switch (colorblindness) {
                case "Protanopia":
                    totalDistance += deltaERgb(Protanopia(palette[i]), Protanopia(palette[j]))
                    comparisons++
                    break

                case "Deuteranopia":
                    totalDistance += deltaERgb(Deuteranopia(palette[i]), Deuteranopia(palette[j]))
                    comparisons++
                    break

                case "Tritanopia":
                    totalDistance += deltaERgb(Tritanopia(palette[i]), Tritanopia(palette[j]))
                    comparisons++
                    break
            }
        }
    }

    return comparisons > 0 ? totalDistance / comparisons : 0
}
