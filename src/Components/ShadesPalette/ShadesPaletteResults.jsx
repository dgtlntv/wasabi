import { useState, useEffect } from "react"
import useGenerateShadesPalette from "../../Hooks/useGenerateShadesPalette"
import sortTargetContrastShades from "../../Utils/ShadesPalette/sortTargetContrastShades"
import SkeletonSquare from "../SkeletonLoader/SkeletonSquare"
import PaletteSquare from "../PaletteSquare"
import SkeletonGrid from "../SkeletonLoader/SkeletonGrid"

export default function ShadesPaletteResults({
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
    setFormSubmitted,
}) {
    const [colors, setColors] = useState(null)
    const { adjustedTargetContrastShades, primaryShades, secondaryShades } = useGenerateShadesPalette({
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
    })

    useEffect(() => {
        setColors([primaryShades, ...secondaryShades])
    }, [primaryShades, secondaryShades])

    return (
        <>
            {adjustedTargetContrastShades ? (
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: `repeat(${targetContrastShades.length * 2}, minmax(auto, 1fr))`,
                        gap: "10px",
                        padding: "20px",
                    }}>
                    {sortTargetContrastShades(adjustedTargetContrastShades).map((contrastShade, index) => {
                        return (
                            <div key={index} style={{ textAlign: "center", marginBottom: "10px" }}>
                                <h4 style={{ margin: "0", padding: "0" }}>{Math.round(contrastShade)}</h4>
                            </div>
                        )
                    })}
                </div>
            ) : null}

            <SkeletonGrid
                rows={secondaryColors.length + 1}
                columns={targetContrastShades.length * 2}
                squareColors={colors}
            />
        </>
    )
}
