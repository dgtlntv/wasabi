import calculateSecondaryShades from "./calculateSecondaryShades"

export default function calculateAllSecondaryShades(
    primaryShades,
    secondaryColorsArray,
    lightBg,
    darkBg,
    lightnessTolerance,
    chromacityTolerance,
    targetColorGamut
) {
    const counterObject = { value: 0 }
    const colorShades = []

    for (const [index, color] of Object.entries(secondaryColorsArray)) {
        colorShades.push(
            calculateSecondaryShades(
                primaryShades,
                color,
                lightBg,
                darkBg,
                lightnessTolerance,
                chromacityTolerance,
                targetColorGamut,
                counterObject
            )
        )
    }

    console.log("Ran through" + counterObject.value + "possibilities")

    return colorShades
}
