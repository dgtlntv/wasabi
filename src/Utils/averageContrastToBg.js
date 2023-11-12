import calcApca from "./Contrast/calcApca"

export default function averageContrastToBg(palette, bg, targetColorGamut) {
    let totalContrast = 0

    for (let i = 0; i < palette.length; i++) {
        totalContrast += calcApca(palette[i], bg, targetColorGamut)
    }

    return palette.length > 0 ? totalContrast / palette.length : 0
}
