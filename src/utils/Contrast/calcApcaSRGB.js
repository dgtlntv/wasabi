import { APCAcontrast, sRGBtoY } from "apca-w3"
import { converter, differenceEuclidean, toGamut } from "culori"

export default function calclApcaSRGB(fg, bg) {
    // Clamp the colors to sRGB color gamut
    const toSRGB = toGamut("rgb", "oklch", differenceEuclidean("oklch"), 0)
    const fgClamped = toSRGB(fg)
    const bgClamped = toSRGB(bg)

    // Convert colors to rgb representation
    const toRGB = converter("rgb")
    const fgRGB = toRGB(fgClamped)
    const bgRGB = toRGB(bgClamped)

    // Convert colors to linear luminance (Y)
    let fgY = sRGBtoY([
        Math.round(Math.max(fgRGB.r * 255, 0)),
        Math.round(Math.max(fgRGB.g * 255, 0)),
        Math.round(Math.max(fgRGB.b * 255, 0)),
    ])
    let bgY = sRGBtoY([
        Math.round(Math.max(bgRGB.r * 255, 0)),
        Math.round(Math.max(bgRGB.g * 255, 0)),
        Math.round(Math.max(bgRGB.b * 255, 0)),
    ])

    return APCAcontrast(fgY, bgY)
}
