export default function monochromeWithSeverity(srgb, severity) {
    var z = Math.round(srgb[0] * 0.299 + srgb[1] * 0.587 + srgb[2] * 0.114)
    var r = z * severity + (1.0 - severity) * srgb[0]
    var g = z * severity + (1.0 - severity) * srgb[1]
    var b = z * severity + (1.0 - severity) * srgb[2]
    return [r, g, b]
}
