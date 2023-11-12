import DataVizPaletteFormCard from "../Components/DataVizPalette/DataVizPaletteFormCard"
import DataVizPaletteResults from "../Components/DataVizPalette/DataVizPaletteResults"
import { useState } from "react"

export default function DataVizPalette() {
    const [lightBg, setLightBg] = useState("#ffffff")
    const [darkBg, setDarkBg] = useState("#000000")
    const [primaryColor, setPrimaryColor] = useState("#E95420")
    const [spread, setSpread] = useState(1)
    const [colorblindness, setColorblindness] = useState(1)
    const [contrast, setContrast] = useState(1)
    const [T, setT] = useState(100)
    const [T_min, setT_min] = useState(0.001)
    const [alpha, setAlpha] = useState(0.9)
    const [targetColorGamut, setTargetColorGamut] = useState("p3")
    const [formSubmitted, setFormSubmitted] = useState(false)
    const [perturbOptions, setPerturbOptions] = useState([false, false, true])
    const [amountOfColors, setAmountOfColors] = useState(5)

    return (
        <>
            {formSubmitted ? (
                <DataVizPaletteResults
                    primaryColor={primaryColor}
                    lightBg={lightBg}
                    darkBg={darkBg}
                    spread={spread}
                    colorblindness={colorblindness}
                    contrast={contrast}
                    T={T}
                    T_min={T_min}
                    alpha={alpha}
                    targetColorGamut={targetColorGamut}
                    perturbOptions={perturbOptions}
                    amountOfColors={amountOfColors}
                    setFormSubmitted={setFormSubmitted}
                />
            ) : (
                <DataVizPaletteFormCard
                    primaryColor={primaryColor}
                    setPrimaryColor={setPrimaryColor}
                    lightBg={lightBg}
                    setLightBg={setLightBg}
                    darkBg={darkBg}
                    setDarkBg={setDarkBg}
                    spread={spread}
                    setSpread={setSpread}
                    colorblindness={colorblindness}
                    setColorblindness={setColorblindness}
                    contrast={contrast}
                    setContrast={setContrast}
                    T={T}
                    setT={setT}
                    T_min={T_min}
                    setT_min={setT_min}
                    alpha={alpha}
                    setAlpha={setAlpha}
                    targetColorGamut={targetColorGamut}
                    setTargetColorGamut={setTargetColorGamut}
                    perturbOptions={perturbOptions}
                    setPerturbOptions={setPerturbOptions}
                    amountOfColors={amountOfColors}
                    setAmountOfColors={setAmountOfColors}
                    setFormSubmitted={setFormSubmitted}
                />
            )}
        </>
    )
}
