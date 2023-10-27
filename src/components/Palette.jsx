import { converter } from "culori"
import { apcach, crToBg, apcachToCss, maxChroma } from "apcach"
import { calcAPCA } from "apca-w3"
import { useEffect, useState } from "react"
import replaceClosest from "../utils/replaceClosestInteger"
import replaceClosestInteger from "../utils/replaceClosestInteger"
import { inColorGamut } from "../utils/inColorGamut"

export default function Palette({
    lightBg,
    darkBg,
    primaryColor,
    secondaryColors,
    contrastTolerance,
    lightnessTolerance,
    chromacityTolerance,
    targetContrastShades,
    targetColorGamut,
    setFormSubmitted,
}) {
    const [shades, setShades] = useState(null)
    const oklch = converter("oklch")

    useEffect(() => {
        const primaryColorOKLCH = oklch(primaryColor)
        const contrastPrimaryColor = calcAPCA(primaryColor, lightBg)
        targetContrastShades = replaceClosestInteger(targetContrastShades, contrastPrimaryColor)

        const shades = []
        for (const [index, contrast] of Object.entries(targetContrastShades)) {
            if (contrast === contrastPrimaryColor) {
                shades.push({
                    name: parseInt(index) + 7,
                    color:
                        "oklch(" +
                        primaryColorOKLCH["l"] * 100 +
                        "% " +
                        primaryColorOKLCH["c"] +
                        " " +
                        primaryColorOKLCH["h"] +
                        ")",
                    isPrimary: true,
                    colorGamut: inColorGamut(primaryColorOKLCH),
                })
            } else {
                const colorDark = apcach(
                    crToBg(lightBg, contrast, "apca", "darker"),
                    maxChroma(primaryColorOKLCH["c"]),
                    primaryColorOKLCH["h"],
                    100,
                    targetColorGamut
                )

                const colorDarkGamut = inColorGamut(apcachToCss(colorDark, "p3"))

                shades.push({
                    name: parseInt(index) + 7,
                    color: apcachToCss(colorDark, "oklch"),
                    colorGamut: colorDarkGamut,
                })
            }
            const colorLight = apcach(
                crToBg(darkBg, contrast, "apca", "lighter"),
                maxChroma(primaryColorOKLCH["c"]),
                primaryColorOKLCH["h"],
                100,
                targetColorGamut
            )

            const colorLightGamut = inColorGamut(apcachToCss(colorLight, "p3"))

            shades.push({ name: 6 - parseInt(index), color: apcachToCss(colorLight, "oklch"), colorGamut: colorLightGamut })
        }
        shades.sort((a, b) => a.name - b.name)
        setShades(shades)
    }, [])

    return (
        <>
            {shades ? (
                <div style={{ display: "flex", gap: "10px" }}>
                    {shades.map((shade, index) => {
                        return (
                            <div
                                key={index}
                                style={{
                                    backgroundColor: shade.color,
                                    width: "100px",
                                    height: "100px",
                                    border: `${shade.isPrimary ? "4px solid #FF0000" : ""}`,
                                }}>
                                <p>{shade.name}</p>
                                <p>{shade.colorGamut}</p>
                            </div>
                        )
                    })}
                </div>
            ) : (
                <p>generating...</p>
            )}
        </>
    )
}
