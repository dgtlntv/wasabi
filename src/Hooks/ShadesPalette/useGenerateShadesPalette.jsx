import { calcAPCA } from "apca-w3"
import { useEffect, useState } from "react"
import replaceClosestInteger from "../../Utils/ShadesPalette/replaceClosestInteger"
import calculatePrimaryShades from "../../Utils/ShadesPalette/calculatePrimaryShades"
import calculateAllSecondaryShades from "../../Utils/ShadesPalette/calculateAllSecondaryShades"
import sortPrimaryShades from "../../Utils/ShadesPalette/sortPrimaryColorShades"
import sortSecondaryShades from "../../Utils/ShadesPalette/sortSecondaryShades"
import hexToOklch from "../../Utils/hexToOklch"

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
    const [primaryShades, setPrimaryShades] = useState(null)
    const [secondaryShades, setSecondaryShades] = useState(null)
    const [adjustedTargetContrastShades, setAdjustedTargetContrastShades] = useState(null)

    useEffect(() => {
        // Calculate the primary shades
        const primaryColorOKLCH = hexToOklch(primaryColor)
        const contrastPrimaryColor = calcAPCA(primaryColor, lightBg)
        const adjustedTargetContrastShades = replaceClosestInteger(targetContrastShades, contrastPrimaryColor)
        const primaryShades = calculatePrimaryShades(
            lightBg,
            darkBg,
            adjustedTargetContrastShades,
            targetColorGamut,
            contrastPrimaryColor,
            primaryColorOKLCH
        )
        // Already set the primary shades so they can already be displayed.
        setAdjustedTargetContrastShades(adjustedTargetContrastShades)
        setPrimaryShades(sortPrimaryShades(primaryShades))

        // Calculate secondary shades
        const allSecondaryShades = calculateAllSecondaryShades(
            primaryShades,
            secondaryColors,
            lightBg,
            darkBg,
            lightnessTolerance,
            chromacityTolerance,
            hueTolerance,
            T,
            T_min,
            alpha,
            targetColorGamut
        )
        setSecondaryShades(sortSecondaryShades(allSecondaryShades))
    }, [])

    return { adjustedTargetContrastShades, primaryShades, secondaryShades }
}
