import { apcach, crToBg, apcachToCss, maxChroma } from "apcach"
import { inColorGamut } from "../General/inColorGamut"
import { formatCss, parse } from "culori"

export default function calculatePrimaryShades(
    primaryColor,
    lightBg,
    darkBg,
    targetContrastShades,
    targetColorGamut,
    contrastPrimaryColor
) {
    const shades = []

    for (const [index, contrast] of Object.entries(targetContrastShades)) {
        if (contrast === contrastPrimaryColor) {
            shades.push({
                name: parseInt(index) + 7,
                colorCss: formatCss(primaryColor),
                color: primaryColor,
                isDark: true,
                isPrimary: true,
                colorGamut: inColorGamut(primaryColor),
                contrastValue: contrast,
            })
        } else {
            const colorDark = apcach(
                crToBg(formatCss(lightBg), contrast, "apca", "darker"),
                maxChroma(primaryColor["c"]),
                primaryColor["h"],
                100,
                targetColorGamut
            )

            shades.push({
                name: parseInt(index) + 7,
                colorCss: apcachToCss(colorDark, "oklch"),
                color: parse(apcachToCss(colorDark, "oklch")),
                isDark: true,
                colorGamut: inColorGamut(apcachToCss(colorDark, "p3")),
                contrastValue: contrast,
            })
        }
        const colorLight = apcach(
            crToBg(formatCss(darkBg), contrast, "apca", "lighter"),
            maxChroma(primaryColor["c"]),
            primaryColor["h"],
            100,
            targetColorGamut
        )

        shades.push({
            name: 6 - parseInt(index),
            colorCss: apcachToCss(colorLight, "oklch"),
            color: parse(apcachToCss(colorLight, "oklch")),
            isDark: false,
            colorGamut: inColorGamut(apcachToCss(colorLight, "p3")),
            contrastValue: contrast,
        })
    }

    return shades
}
