import useGenerateShadesPalette from "../../Hooks/useGenerateShadesPalette"
import sortTargetContrastShades from "../../Utils/ShadesPalette/sortTargetContrastShades"

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

    return (
        <>
            {primaryShades && adjustedTargetContrastShades ? (
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: `repeat(${primaryShades.length}, minmax(auto, 1fr))`,
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
                    {primaryShades.map((shade, index) => {
                        return (
                            <div
                                key={index}
                                style={{
                                    backgroundColor: shade.colorCss,
                                    aspectRatio: "1/1",
                                    padding: "10px",
                                    color: `${shade.isDark ? "white" : "black"}`,
                                    border: `${shade.isPrimary ? "4px solid #FF0000" : ""}`,
                                }}>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        height: "100%",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                    }}>
                                    <div>
                                        <p style={{ margin: "0", padding: "0" }}>
                                            L: {Math.round(shade.color["l"] * 100) / 100}
                                        </p>
                                        <p style={{ margin: "0", padding: "0" }}>
                                            C: {Math.round(shade.color["c"] * 100) / 100}
                                        </p>
                                        <p style={{ margin: "0", padding: "0" }}>
                                            H: {Math.round(shade.color["h"] * 100) / 100}
                                        </p>
                                    </div>
                                    <p style={{ margin: "0", padding: "0" }}>Gamut: {shade.colorGamut}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            ) : (
                <p>Generating primary shades...</p>
            )}
            {secondaryShades ? (
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: `repeat(${primaryShades.length}, minmax(auto, 1fr))`,
                        gap: "10px",
                        padding: "20px",
                    }}>
                    {secondaryShades.map((shadesArray, index) => {
                        return shadesArray.map((shade, index) => {
                            return (
                                <div
                                    key={index}
                                    style={{
                                        backgroundColor: shade.colorCss,
                                        aspectRatio: "1/1",
                                        padding: "10px",
                                        color: `${shade.isDark ? "white" : "black"}`,
                                        border: `${shade.isPrimary ? "4px solid #FF0000" : ""}`,
                                    }}>
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            height: "100%",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                        }}>
                                        <div>
                                            <p style={{ margin: "0", padding: "0" }}>
                                                L: {Math.round(shade.color["l"] * 100) / 100}
                                            </p>
                                            <p style={{ margin: "0", padding: "0" }}>
                                                C: {Math.round(shade.color["c"] * 100) / 100}
                                            </p>
                                            <p style={{ margin: "0", padding: "0" }}>
                                                H: {Math.round(shade.color["h"] * 100) / 100}
                                            </p>
                                            <p style={{ margin: "0", padding: "0" }}>
                                                Contrast: {Math.round(shade.contrastValue * 100) / 100}
                                            </p>
                                        </div>
                                        <p style={{ margin: "0", padding: "0" }}>Gamut: {shade.colorGamut}</p>
                                    </div>
                                </div>
                            )
                        })
                    })}
                </div>
            ) : (
                <p>Generating secondary shades...</p>
            )}
        </>
    )
}
