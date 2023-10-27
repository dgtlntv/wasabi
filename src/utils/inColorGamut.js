import { modeRgb, modeP3, useMode, parse } from "culori"
const GAMUT_EPSILON = 1e-6
const GAMUT_MIN = -GAMUT_EPSILON
const GAMUT_MAX = 1 + GAMUT_EPSILON

export let rgb = useMode(modeRgb)
export let p3 = useMode(modeP3)

export function inColorGamut(color) {
    if (inRGB(color)) {
        return "srgb"
    } else if (inP3(color)) {
        return "p3"
    } else {
        return "none"
    }
}

export function inP3(color) {
    let { b, g, r } = p3(color)
    return r >= GAMUT_MIN && r <= GAMUT_MAX && g >= GAMUT_MIN && g <= GAMUT_MAX && b >= GAMUT_MIN && b <= GAMUT_MAX
}

export function inRGB(color) {
    let { b, g, r } = rgb(color)
    return r >= GAMUT_MIN && r <= GAMUT_MAX && g >= GAMUT_MIN && g <= GAMUT_MAX && b >= GAMUT_MIN && b <= GAMUT_MAX
}
