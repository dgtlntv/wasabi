import React, { useState } from "react"
import FormCard from "./components/FormCard"
import Palette from "./components/Palette"

export default function App() {
    const [lightBg, setLightBg] = useState("#ffffff")
    const [darkBg, setDarkBg] = useState("#000000")
    const [primaryColor, setPrimaryColor] = useState("#E95420")
    const [secondaryColors, setSecondaryColors] = useState([
        "#c7162b",
        "#f99b11",
        "#0e8420",
        "#24598f",
        "#0f95a1",
        "#666666",
    ])
    const [lightnessTolerance, setLightnessTolerance] = useState(0.05)
    const [chromacityTolerance, setChromacityTolerance] = useState(0.05)
    const [hueTolerance, setHueTolerance] = useState(10)
    const [T, setT] = useState(100)
    const [T_min, setT_min] = useState(0.001)
    const [alpha, setAlpha] = useState(0.9)
    const [targetContrastShades, setTargetContrastShades] = useState([54, 65, 77, 90, 100, 105])
    const [targetColorGamut, setTargetColorGamut] = useState("p3")
    const [formSubmitted, setFormSubmitted] = useState(false)

    return (
        <>
            {formSubmitted ? (
                <Palette
                    lightBg={lightBg}
                    darkBg={darkBg}
                    primaryColor={primaryColor}
                    secondaryColors={secondaryColors}
                    lightnessTolerance={lightnessTolerance}
                    chromacityTolerance={chromacityTolerance}
                    hueTolerance={hueTolerance}
                    T={T}
                    T_min={T_min}
                    alpha={alpha}
                    targetContrastShades={targetContrastShades}
                    targetColorGamut={targetColorGamut}
                    setFormSubmitted={setFormSubmitted}
                />
            ) : (
                <FormCard
                    lightBg={lightBg}
                    setLightBg={setLightBg}
                    darkBg={darkBg}
                    setDarkBg={setDarkBg}
                    primaryColor={primaryColor}
                    setPrimaryColor={setPrimaryColor}
                    secondaryColors={secondaryColors}
                    setSecondaryColors={setSecondaryColors}
                    lightnessTolerance={lightnessTolerance}
                    setLightnessTolerance={setLightnessTolerance}
                    chromacityTolerance={chromacityTolerance}
                    setChromacityTolerance={setChromacityTolerance}
                    hueTolerance={hueTolerance}
                    setHueTolerance={setHueTolerance}
                    T={T}
                    setT={setT}
                    T_min={T_min}
                    setT_min={setT_min}
                    alpha={alpha}
                    setAlpha={setAlpha}
                    targetContrastShades={targetContrastShades}
                    setTargetContrastShades={setTargetContrastShades}
                    targetColorGamut={targetColorGamut}
                    setTargetColorGamut={setTargetColorGamut}
                    setFormSubmitted={setFormSubmitted}
                />
            )}
        </>
    )
}
