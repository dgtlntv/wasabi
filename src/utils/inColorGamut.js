import { inGamut } from "culori"

const inRgb = inGamut("rgb")
const inP3 = inGamut("p3")

export function inColorGamut(color) {
    if (inRgb(color)) {
        return "srgb"
    } else if (inP3(color)) {
        return "p3"
    } else {
        return false
    }
}
