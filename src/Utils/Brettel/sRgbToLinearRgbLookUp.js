import sRgbToLinearRgb from "./sRgbToLinearRgb"

export default function sRgbToLinearRgbLookup() {
    const sRgbToLinearRgbLookUp = []
    for (let i = 0; i < 256; i++) {
        sRgbToLinearRgbLookUp[i] = sRgbToLinearRgb(i)
    }
    return sRgbToLinearRgbLookUp
}
