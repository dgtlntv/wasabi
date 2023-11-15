export default function SkeletonGrid({ rows, columns, squareColors }) {
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
                        }}>
                        <div
                            style={{
                                backgroundColor: color,
                                aspectRatio: "1/1",
                                padding: "10px",
                                transition: "background-color 2s ease",
                            }}
                        />
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
            }}>
            {renderGridItems()}
        </div>
    )
}
