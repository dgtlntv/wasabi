import { calcAPCA } from "apca-w3"
import { useEffect, useState } from "react"
import replaceClosestInteger from "../utils/replaceClosestInteger"
import calculatePrimaryShades from "../utils/calculatePrimaryShades"
import calculateAllSecondaryShades from "../utils/calculateAllSecondaryShades"
import sortPrimaryShades from "../utils/sortPrimaryColorShades"
import sortSecondaryShades from "../utils/sortSecondaryShades"
import hexToOklch from "../utils/hexToOklch"

export default function useGeneratePalette({
    lightBg,
    darkBg,
    primaryColor,
    secondaryColors,
    lightnessTolerance,
    chromacityTolerance,
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
            targetColorGamut
        )
        setSecondaryShades(sortSecondaryShades(allSecondaryShades))
    }, [])

    return { adjustedTargetContrastShades, primaryShades, secondaryShades }
}
