import deltaERgb from "./deltaERgb"
import oklchArrayToRgb from "./oklchArrayToRgb"
import { Protanopia, Deuteranopia, Tritanopia } from "./Brettel/brettelFunctions"

export default function averageDeltaEOfColorblindness(colorArray, colorblindness) {
    let totalDistance = 0
    let comparisons = 0

    for (let i = 0; i < colorArray.length; i++) {
        for (let j = i + 1; j < colorArray.length; j++) {
            switch (colorblindness) {
                case "Protanopia":
                    totalDistance += deltaERgb(
                        Protanopia(oklchArrayToRgb(colorArray[i])),
                        Protanopia(oklchArrayToRgb(colorArray[j]))
                    )
                    comparisons++
                    break

                case "Deuteranopia":
                    totalDistance += deltaERgb(
                        Deuteranopia(oklchArrayToRgb(colorArray[i])),
                        Deuteranopia(oklchArrayToRgb(colorArray[j]))
                    )
                    comparisons++
                    break

                case "Tritanopia":
                    totalDistance += deltaERgb(
                        Tritanopia(oklchArrayToRgb(colorArray[i])),
                        Tritanopia(oklchArrayToRgb(colorArray[j]))
                    )
                    comparisons++
                    break
            }
        }
    }

    return comparisons > 0 ? totalDistance / comparisons : 0
}
