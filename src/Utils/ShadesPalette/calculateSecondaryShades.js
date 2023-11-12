import annealHue from "./simulatedAnnealing/annealHue"

export function calculateSecondaryShades(
    primaryShades,
    secondaryColor,
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
) {
    // TODO:
    // 3. Adjust layout of shades so it doesnt overflow?

    const bestShades = annealHue(
        primaryShades,
        secondaryColor,
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

    return bestShades
}
