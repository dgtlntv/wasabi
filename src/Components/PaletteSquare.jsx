export default function PaletteSquare({ shade }) {
    return (
        <div
            style={{
                backgroundColor: shade.colorCss,
                aspectRatio: "1/1",
                padding: "10px",
                color: `${shade?.isDark ? "white" : "black"}`,
                border: `${shade?.isPrimary ? "4px solid #FF0000" : ""}`,
            }}
        >
            {shade ? (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <div>
                        <p style={{ margin: "0", padding: "0" }}>L: {Math.round(shade.color["l"] * 100) / 100}</p>
                        <p style={{ margin: "0", padding: "0" }}>C: {Math.round(shade.color["c"] * 100) / 100}</p>
                        <p style={{ margin: "0", padding: "0" }}>H: {Math.round(shade.color["h"] * 100) / 100}</p>
                    </div>
                    <p style={{ margin: "0", padding: "0" }}>Gamut: {shade.colorGamut}</p>
                </div>
            ) : null}
        </div>
    )
}
