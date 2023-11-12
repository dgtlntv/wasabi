import { useState, useRef } from "react"
import { HexColorPicker, HexColorInput } from "react-colorful"
import useOutsideClick from "../../Hooks/useOutsideClick"

export default function ColorSquare({ rectangleStyle, color, setColor }) {
    const [colorPickerActive, setColorPickerActive] = useState(false)
    const colorPickerRef = useRef(null)

    const handleColorChange = (pickedColor) => {
        setColor(pickedColor)
    }

    useOutsideClick(colorPickerRef, () => {
        setColorPickerActive(false)
    })

    return (
        <div style={{ position: "relative" }}>
            {colorPickerActive ? (
                <>
                    <div
                        ref={colorPickerRef}
                        style={{
                            position: "absolute",
                            zIndex: "10",
                            filter: "drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1))",
                        }}>
                        <HexColorPicker color={color} onChange={handleColorChange} />
                        <div className="color-picker-wrapper">
                            <input
                                className="color-picker-input-field"
                                value={color.substring(1)}
                                onChange={(e) => handleColorChange("#" + e.target.value)}
                                maxLength="6"
                            />
                        </div>
                    </div>
                    <div style={{ width: rectangleStyle.width, height: rectangleStyle.height }} />
                </>
            ) : (
                <div style={{ ...rectangleStyle, backgroundColor: color }} onClick={() => setColorPickerActive(true)} />
            )}
        </div>
    )
}
