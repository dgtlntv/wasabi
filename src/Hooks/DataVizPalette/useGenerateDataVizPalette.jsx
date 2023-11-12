import { useState, useEffect } from "react"
import hexToOklch from "../../Utils/hexToOklch"
import calculateDataVizPalette from "../../Utils/DataVizPalette/calculateDataVizPalette"

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
        // Calculate the primary shades
        const primaryColorOKLCH = hexToOklch(primaryColor)
        const dataVizColors = calculateDataVizPalette(
            lightBg,
            darkBg,
            primaryColorOKLCH,
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
    }, [])

    return { dataVizPalette }
}
