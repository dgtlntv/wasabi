import { useState, useEffect } from "react"
import hexToOklch from "../Utils/General/hexToOklch"
import { wrap } from "comlink"

export default function useGenerateDataVizPalette({
    lightBg,
    darkBg,
    primaryColor,
    spread,
    colorblindness,
    contrast,
    T,
    T_min,
    alpha,
    targetColorGamut,
    perturbOptions,
    amountOfColors,
}) {
    const [dataVizPalette, setDataVizPalette] = useState(null)

    useEffect(() => {
        async function calcPalette() {
            const worker = new Worker("src/Utils/DataVizPalette/Worker/worker", {
                name: "paletteWorker",
                type: "module",
            })
            const { calculateDataVizPalette } = wrap(worker)

            const dataVizColors = await calculateDataVizPalette(
                hexToOklch(lightBg),
                hexToOklch(darkBg),
                hexToOklch(primaryColor),
                targetColorGamut,
                spread,
                colorblindness,
                contrast,
                T,
                T_min,
                alpha,
                perturbOptions,
                amountOfColors
            )

            setDataVizPalette(dataVizColors)
        }
        calcPalette()
    }, [])

    return { dataVizPalette }
}
