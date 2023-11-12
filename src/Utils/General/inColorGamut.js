import { inGamut } from "culori"

export function inColorGamut(color) {
    const inRgb = inGamut("rgb")
    const inP3 = inGamut("p3")

    if (inRgb(color)) {
        return "srgb"
    } else if (inP3(color)) {
        return "p3"
    } else {
        return "outside"
    }
}
