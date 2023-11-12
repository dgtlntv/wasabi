import { brettelParams } from "./brettelParams"
import { converter, parse, toGamut, differenceEuclidean } from "culori"

export default function brettel(color, t, severity) {
    // TODO: There is currently no colorblindness imulator for P3 color space. Can we make it happen?

    const toSRGB = toGamut("rgb", "oklch", differenceEuclidean("oklch"), 0)
    const colorClamped = toSRGB(color)
    const toLinearRGB = converter("lrgb")
    const toRGB = converter("rgb")
    const linearRGB = toLinearRGB(colorClamped)

    var params = brettelParams[t]
    var separationPlaneNormal = params["separationPlaneNormal"]
    var rgbCvdFromRgb_1 = params["rgbCvdFromRgb_1"]
    var rgbCvdFromRgb_2 = params["rgbCvdFromRgb_2"]

    // Check on which plane we should project by comparing wih the separation plane normal.
    var dotWithSepPlane =
        linearRGB["r"] * separationPlaneNormal[0] +
        linearRGB["g"] * separationPlaneNormal[1] +
        linearRGB["b"] * separationPlaneNormal[2]
    var rgbCvdFromRgb = dotWithSepPlane >= 0 ? rgbCvdFromRgb_1 : rgbCvdFromRgb_2

    // Transform to the full dichromat projection plane.
    var rgb_cvd = Array(3)
    rgb_cvd[0] = rgbCvdFromRgb[0] * linearRGB["r"] + rgbCvdFromRgb[1] * linearRGB["g"] + rgbCvdFromRgb[2] * linearRGB["b"]
    rgb_cvd[1] = rgbCvdFromRgb[3] * linearRGB["r"] + rgbCvdFromRgb[4] * linearRGB["g"] + rgbCvdFromRgb[5] * linearRGB["b"]
    rgb_cvd[2] = rgbCvdFromRgb[6] * linearRGB["r"] + rgbCvdFromRgb[7] * linearRGB["g"] + rgbCvdFromRgb[8] * linearRGB["b"]

    // Apply the severity factor as a linear interpolation.
    // It's the same to do it in the RGB space or in the LMS
    // space since it's a linear transform.
    rgb_cvd[0] = rgb_cvd[0] * severity + linearRGB["r"] * (1.0 - severity)
    rgb_cvd[1] = rgb_cvd[1] * severity + linearRGB["g"] * (1.0 - severity)
    rgb_cvd[2] = rgb_cvd[2] * severity + linearRGB["b"] * (1.0 - severity)

    // Go back to sRGB
    return toRGB({
        mode: "lrgb",
        r: rgb_cvd[0],
        g: rgb_cvd[1],
        b: rgb_cvd[2],
    })
}
