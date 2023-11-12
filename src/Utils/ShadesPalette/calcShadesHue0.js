import { calcAPCA } from "apca-w3"
import { inColorGamut } from "../inColorGamut"
import oklchArrayToHex from "../oklchArrayToHex"
import oklchArrayToCss from "../oklchArrayToCss"

export default function calcShadesHue0(primaryShades, lightBg, darkBg) {
    const shades = []

    for (const [index, primaryShade] of Object.entries(primaryShades)) {
        const shade = [primaryShade.color[0], 0, 0]

        const contrast = Math.abs(calcAPCA(oklchArrayToHex(shade), primaryShade.isDark ? lightBg : darkBg))

        shades.push({
            color: shade,
            colorCss: oklchArrayToCss(shade),
            name: primaryShade.name,
            isDark: primaryShade.isDark,
            colorGamut: inColorGamut(oklchArrayToHex(shade)),
            contrastValue: contrast,
        })
    }

    return shades
}
