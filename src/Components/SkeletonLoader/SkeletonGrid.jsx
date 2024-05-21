import { useState } from "react"

export default function SkeletonGrid({ rows, columns, squareColors }) {
    const [showDetails, setShowDetails] = useState(false)

    const getDelay = (row, col) => {
        const delayFactor = 0.11
        return `${(row + col) * delayFactor}s`
    }

    const renderGridItems = () => {
        let items = []
        console.log(rows, columns)
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < columns; col++) {
                const color =
                    squareColors && squareColors[row] && squareColors[row][col]
                        ? squareColors[row][col]["colorCss"]
                        : "#ececec"
                items.push(
                    <div
                        key={`item-${row}-${col}`}
                        style={{
                            opacity: 0,
                            animation: `appear 0.5s ease forwards ${getDelay(row, col)}`,
                        }}
                    >
                        <div
                            style={{
                                backgroundColor: color,
                                aspectRatio: "1/1",
                                padding: "10px",
                                transition: "background-color 2s ease",
                                color: `${
                                    squareColors &&
                                    squareColors[row] &&
                                    squareColors[row][col] &&
                                    squareColors[row][col]["isDark"]
                                        ? "white"
                                        : "black"
                                }`,
                                border: `${
                                    squareColors &&
                                    squareColors[row] &&
                                    squareColors[row][col] &&
                                    squareColors[row][col]["isPrimary"]
                                        ? "4px solid #FF0000"
                                        : ""
                                }`,
                            }}
                        >
                            {squareColors && squareColors[row] && squareColors[row][col] && showDetails ? (
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        height: "100%",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        textAlign: "center",
                                    }}
                                >
                                    <div>
                                        <p style={{ margin: "0", padding: "0" }}>
                                            L: {Math.round(squareColors[row][col]["color"]["l"] * 100) / 100}
                                        </p>
                                        <p style={{ margin: "0", padding: "0" }}>
                                            C: {Math.round(squareColors[row][col]["color"]["c"] * 100) / 100}
                                        </p>
                                        <p style={{ margin: "0", padding: "0" }}>
                                            H: {Math.round(squareColors[row][col]["color"]["h"] * 100) / 100}
                                        </p>
                                        <p style={{ margin: "0", padding: "0" }}>
                                            Contrast: {Math.round(squareColors[row][col]["contrastValue"] * 100) / 100}
                                        </p>
                                    </div>
                                    <p style={{ margin: "0", padding: "0" }}>
                                        Gamut: {squareColors[row][col]["colorGamut"]}
                                    </p>
                                </div>
                            ) : null}
                        </div>
                    </div>
                )
            }
        }
        return items
    }

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: `repeat(${columns}, minmax(auto, 1fr))`,
                gap: "10px",
                padding: "20px",
                cursor: "pointer",
            }}
            onClick={() => setShowDetails((d) => !d)}
        >
            {renderGridItems()}
        </div>
    )
}
