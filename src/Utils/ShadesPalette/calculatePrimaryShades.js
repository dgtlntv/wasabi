import { apcach, crToBg, apcachToCss, maxChroma } from "apcach"
import { inColorGamut } from "../inColorGamut"
import oklchArrayToCss from "../oklchArrayToCss"

export default function calculatePrimaryShades(
    lightBg,
    darkBg,
    targetContrastShades,
    targetColorGamut,
    contrastPrimaryColor,
    primaryColorOKLCH
) {
    const shades = []

    for (const [index, contrast] of Object.entries(targetContrastShades)) {
        if (contrast === contrastPrimaryColor) {
            shades.push({
                name: parseInt(index) + 7,
                colorCss: oklchArrayToCss([primaryColorOKLCH["l"], primaryColorOKLCH["c"], primaryColorOKLCH["h"]]),
                color: [primaryColorOKLCH["l"], primaryColorOKLCH["c"], primaryColorOKLCH["h"]],
                isDark: true,
                isPrimary: true,
                colorGamut: inColorGamut(primaryColorOKLCH),
                contrastValue: contrast,
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
                colorCss: apcachToCss(colorDark, "oklch"),
                color: [colorDark["lightness"], colorDark["chroma"], colorDark["hue"]],
                isDark: true,
                colorGamut: colorDarkGamut,
                contrastValue: contrast,
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

        shades.push({
            name: 6 - parseInt(index),
            colorCss: apcachToCss(colorLight, "oklch"),
            color: [colorLight["lightness"], colorLight["chroma"], colorLight["hue"]],
            isDark: false,
            colorGamut: colorLightGamut,
            contrastValue: contrast,
        })
    }

    return shades
}
