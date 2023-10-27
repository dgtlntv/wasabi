import { calcAPCA } from "apca-w3"
import hexToOklch from "./hexToOklch"
import { inColorGamut } from "./inColorGamut"
import oklchArrayToCss from "./oklchArrayToCss"
import oklchArrayToHex from "./oklchArrayToHex"

export default function calculateSecondaryShades(
    primaryShades,
    secondaryColor,
    lightBg,
    darkBg,
    contrastTolerance,
    lightnessTolerance,
    chromacityTolerance,
    targetColorGamut
) {
    const secondaryColorOKLCH = hexToOklch(secondaryColor)
    const secondaryShades = []

    for (const [index, primaryShade] of Object.entries(primaryShades)) {
        console.log(primaryShade)
        const minLightness = primaryShade.color[0] - lightnessTolerance
        const maxLightness = primaryShade.color[0] + lightnessTolerance
        const minChromacity = primaryShade.color[1] - chromacityTolerance
        const maxChromacity = primaryShade.color[1] + chromacityTolerance
        const minContrast = primaryShade.contrastValue - contrastTolerance
        const maxContrast = primaryShade.contrastValue + contrastTolerance
        const secondaryShade = [primaryShade.color[0], primaryShade.color[1], secondaryColorOKLCH["h"]]
        const lightnessStepSize = 0.001
        const chromacityStepSize = 0.001

        let contrast = calcAPCA(secondaryColor, primaryShade.isDark ? lightBg : darkBg)
        let foundShade = false

        if (contrast <= maxContrast && contrast >= minContrast) {
            secondaryShades.push({
                color: secondaryShade,
                colorCss: oklchArrayToCss(secondaryShade),
                name: primaryShade.name,
                isDark: primaryShade.isDark,
                colorGamut: inColorGamut(secondaryColorOKLCH),
                contrastValue: contrast,
            })
            foundShade = true
        } else {
            for (let l = minLightness; l <= maxLightness && !foundShade; l += lightnessStepSize) {
                for (let c = minChromacity; c <= maxChromacity && !foundShade; c += chromacityStepSize) {
                    const testShade = [l, c, secondaryColorOKLCH["h"]]
                    const testContrast = calcAPCA(oklchArrayToHex(testShade), primaryShade.isDark ? lightBg : darkBg)

                    if (
                        testContrast <= maxContrast &&
                        testContrast >= minContrast &&
                        inColorGamut(oklchArrayToCss(testShade))
                    ) {
                        secondaryShades.push({
                            color: testShade,
                            colorCss: oklchArrayToCss(testShade),
                            name: primaryShade.name,
                            isDark: primaryShade.isDark,
                            colorGamut: inColorGamut(testShade),
                            contrastValue: testContrast,
                        })
                        foundShade = true
                        break
                    }
                }
                if (foundShade) {
                    break
                }
            }
        }

        if (!foundShade) {
            secondaryShades.push({ color: false })
        }
    }

    return secondaryShades
}
