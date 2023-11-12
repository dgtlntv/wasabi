export default function sRgbToLinearRgb(v) {
    var fv = v / 255.0
    if (fv < 0.04045) return fv / 12.92
    return Math.pow((fv + 0.055) / 1.055, 2.4)
}
