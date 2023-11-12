import useGenerateDataVizPalette from "../../Hooks/DataVizPalette/useGenerateDataVizPalette"

export default function DataVizPaletteResults({
    primaryColor,
    lightBg,
    darkBg,
    spread,
    colorblindness,
    contrast,
    T,
    T_min,
    alpha,
    targetColorGamut,
    perturbOptions,
    amountOfColors,
    setFormSubmitted,
}) {
    const { dataVizPalette } = useGenerateDataVizPalette({
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
    })

    return (
        <>
            {dataVizPalette ? (
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: `repeat(${dataVizPalette.length}, minmax(auto, 1fr))`,
                        gap: "10px",
                        padding: "20px",
                    }}>
                    {dataVizPalette.map((shade, index) => {
                        console.log(shade)
                        return (
                            <div
                                key={index}
                                style={{
                                    backgroundColor: shade.colorCss,
                                    aspectRatio: "1/1",
                                    padding: "10px",
                                    color: "white",
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
                <div>Generating Palette</div>
            )}
        </>
    )
}
