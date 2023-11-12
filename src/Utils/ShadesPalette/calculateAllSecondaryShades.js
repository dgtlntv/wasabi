import shadesWorker from "./worker/shadesWorker"
import WebWorker from "./Worker/WebWorker"

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
    targetColorGamut,
    setSecondaryShades
) {
    const webWorker = new WebWorker(shadesWorker)
    const counterObject = { value: 0 }

    webWorker.addEventListener("message", (e) => {
        setSecondaryShades((prevShades) => [...prevShades, e.data])
    })

    for (const [index, color] of Object.entries(secondaryColorsArray)) {
        webWorker.postMessage({
            primaryShades,
            color,
            lightBg,
            darkBg,
            lightnessTolerance,
            chromacityTolerance,
            hueTolerance,
            T,
            T_min,
            alpha,
            targetColorGamut,
            counterObject,
        })
    }

    console.log("Ran through " + counterObject.value + " possibilities")
    return () => {
        webWorker.terminate()
    }
}
