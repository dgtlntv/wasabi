import { APCAcontrast, displayP3toY } from "apca-w3"
import { converter, differenceEuclidean, toGamut } from "culori"

export default function calcApcaP3(fg, bg) {
    // Clamp the colors to P3 color gamut
    const toP3 = toGamut("p3", "oklch", differenceEuclidean("oklch"), 0)
    const fgClamped = toP3(fg)
    const bgClamped = toP3(bg)

    // Convert colors to rgb representation of P3
    const toRGBP3 = converter("p3")
    const fgRGBP3 = toRGBP3(fgClamped)
    const bgRGBP3 = toRGBP3(bgClamped)

    // Convert colors to linear luminance (Y)
    let fgY = displayP3toY([Math.max(fgRGBP3.r, 0), Math.max(fgRGBP3.g, 0), Math.max(fgRGBP3.b, 0)])
    let bgY = displayP3toY([Math.max(bgRGBP3.r, 0), Math.max(bgRGBP3.g, 0), Math.max(bgRGBP3.b, 0)])

    return APCAcontrast(fgY, bgY)
}
