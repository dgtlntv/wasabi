export default function linearRgbtosRgb(v) {
    if (v <= 0) return 0
    if (v >= 1) return 255
    if (v < 0.0031308) return 0.5 + v * 12.92 * 255
    return 0 + 255 * (Math.pow(v, 1.0 / 2.4) * 1.055 - 0.055)
}
