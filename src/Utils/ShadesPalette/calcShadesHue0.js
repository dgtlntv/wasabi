import { inColorGamut } from "../General/inColorGamut"
import calcApca from "../Contrast/calcApca"
import { formatCss } from "culori"

export default function calcShadesHue0(primaryShades, lightBg, darkBg, targetColorGamut) {
    const shades = []

    for (const [index, primaryShade] of Object.entries(primaryShades)) {
        const shade = { ...primaryShade.color, c: 0, h: 0 }
        const contrast = Math.abs(calcApca(shade, primaryShade.isDark ? lightBg : darkBg, targetColorGamut))

        shades.push({
            color: shade,
            colorCss: formatCss(shade),
            name: primaryShade.name,
            isDark: primaryShade.isDark,
            colorGamut: inColorGamut(shade),
            contrastValue: contrast,
        })
    }

    return shades
}
