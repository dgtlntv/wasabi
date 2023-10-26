import React, { useState } from "react"
import FormCard from "./components/FormCard"

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
    const [formSubmitted, setFormSubmitted] = useState(false)

    return (
        <>
            {formSubmitted ? (
                <h1>Hi mum :)</h1>
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
                    setFormSubmitted={setFormSubmitted}
                />
            )}
        </>
    )
}
