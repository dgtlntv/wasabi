import annealHue from "./simulatedAnnealing/annealHue"

export default function calculateSecondaryShades(
    primaryShades,
    secondaryColor,
    lightBg,
    darkBg,
    lightnessTolerance,
    chromacityTolerance,
    targetColorGamut,
    counterObject
) {
    const T = 100.0
    const T_min = 0.001
    const alpha = 0.9
    const hueTolerance = 10

    // TODO:
    // 1. hueTolerance in form, pass down
    // 2. Make it so palette is displayed immediatly, not lagging on the submit button
    // 2. Adjust annealing config
    // 3. Adjust perturb config

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
        counterObject
    )

    return bestShades
}
