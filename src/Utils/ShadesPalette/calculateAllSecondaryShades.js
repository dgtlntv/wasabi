import hexToOklch from "../hexToOklch"
import calculateSecondaryShades from "./calculateSecondaryShades"

export default function calculateAllSecondaryShades(
    primaryShades,
    secondaryColorsArray,
    lightBg,
    darkBg,
    lightnessTolerance,
    chromacityTolerance,
    hueTolerance,
    T,
    T_min,
    alpha,
    targetColorGamut
) {
    const counterObject = { value: 0 }
    const colorShades = []

    for (const [index, color] of Object.entries(secondaryColorsArray)) {
        colorShades.push(
            calculateSecondaryShades(
                primaryShades,
                hexToOklch(color),
                lightBg,
                darkBg,
                lightnessTolerance,
                chromacityTolerance,
                hueTolerance,
                T,
                T_min,
                alpha,
                targetColorGamut,
                counterObject
            )
        )
    }
    // TODO: Surface this stat on the page
    console.log("Ran through" + counterObject.value + "possibilities")

    return colorShades
}
