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
        "#666666",
        "#0f95a1",
    ])
    const [contrastTolerance, setContrastTolerance] = useState(0.5)
    const [lightnessTolerance, setLightnessTolerance] = useState(1)
    const [chromacityTolerance, setChromacityTolerance] = useState(1)
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
                    contrastTolerance={contrastTolerance}
                    lightnessTolerance={lightnessTolerance}
                    chromacityTolerance={chromacityTolerance}
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
                    contrastTolerance={contrastTolerance}
                    setContrastTolerance={setContrastTolerance}
                    lightnessTolerance={lightnessTolerance}
                    setLightnessTolerance={setLightnessTolerance}
                    chromacityTolerance={chromacityTolerance}
                    setChromacityTolerance={setChromacityTolerance}
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
