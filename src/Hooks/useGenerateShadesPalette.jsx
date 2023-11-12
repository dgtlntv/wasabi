import { useEffect, useState } from "react"
import replaceClosestInteger from "../Utils/ShadesPalette/replaceClosestInteger"
import calculatePrimaryShades from "../Utils/ShadesPalette/calculatePrimaryShades"
import sortPrimaryShades from "../Utils/ShadesPalette/sortPrimaryColorShades"
import hexToOklch from "../Utils/General/hexToOklch"
import calcApca from "../Utils/Contrast/calcApca"
import sortSecondaryShades from "../Utils/ShadesPalette/sortSecondaryShades"
import { wrap } from "comlink"

export default function useGenerateShadesPalette({
    lightBg,
    darkBg,
    primaryColor,
    secondaryColors,
    lightnessTolerance,
    chromacityTolerance,
    hueTolerance,
    T,
    T_min,
    alpha,
    targetContrastShades,
    targetColorGamut,
}) {
    const [primaryShades, setPrimaryShades] = useState([])
    const [secondaryShades, setSecondaryShades] = useState([])
    const [adjustedTargetContrastShades, setAdjustedTargetContrastShades] = useState(null)
    const counterObject = { value: 0 }

    useEffect(() => {
        async function calcShades() {
            primaryColor = hexToOklch(primaryColor)
            lightBg = hexToOklch(lightBg)
            darkBg = hexToOklch(darkBg)

            const contrastPrimaryColor = calcApca(primaryColor, lightBg, targetColorGamut)
            const adjustedTargetContrastShades = replaceClosestInteger(targetContrastShades, contrastPrimaryColor)
            const primaryShades = calculatePrimaryShades(
                primaryColor,
                lightBg,
                darkBg,
                adjustedTargetContrastShades,
                targetColorGamut,
                contrastPrimaryColor
            )
            // Set the primary shades so they can already be displayed.
            setAdjustedTargetContrastShades(adjustedTargetContrastShades)
            setPrimaryShades(sortPrimaryShades(primaryShades))

            const worker = new Worker("src/Utils/ShadesPalette/Worker/worker", {
                name: "secondaryShadesWorker",
                type: "module",
            })
            const { calculateSecondaryShades } = wrap(worker)

            secondaryColors.forEach(async (color) => {
                const secondaryShade = await calculateSecondaryShades(
                    primaryShades,
                    hexToOklch(color),
                    hexToOklch(lightBg),
                    hexToOklch(darkBg),
                    lightnessTolerance,
                    chromacityTolerance,
                    hueTolerance,
                    T,
                    T_min,
                    alpha,
                    targetColorGamut,
                    counterObject
                )
                setSecondaryShades((prevShades) => [...prevShades, sortSecondaryShades(secondaryShade)])
            })
        }
        calcShades()
    }, [])

    return { adjustedTargetContrastShades, primaryShades, secondaryShades }
}
