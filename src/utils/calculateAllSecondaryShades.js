import calculateSecondaryShades from "./calculateSecondaryShades"

export default function calculateAllSecondaryShades(
    primaryShades,
    secondaryColorsArray,
    lightBg,
    darkBg,
    contrastTolerance,
    lightnessTolerance,
    chromacityTolerance,
    targetColorGamut
) {
    const colorShades = []

    for (const [index, color] of Object.entries(secondaryColorsArray)) {
        colorShades.push(
            calculateSecondaryShades(
                primaryShades,
                color,
                lightBg,
                darkBg,
                contrastTolerance,
                lightnessTolerance,
                chromacityTolerance,
                targetColorGamut
            )
        )
    }

    return colorShades
}
