import sRgbToLinearRgbLookup from "./sRgbToLinearRgbLookUp"
import linearRgbtosRgb from "./linearRGBtosRGB"
import { brettelParams } from "./brettelParams"
import { converter, parse } from "culori"

export default function brettel(color, t, severity) {
    // TODO: Adjust so this also works with P3

    const toSRGB = toGamut("rgb", "oklch", differenceEuclidean("oklch"), 0)
    const colorClamped = toSRGB(color)
    const toRGB = converter("rgb")
    const srgb = toRGB(colorClamped)

    const sRgbToLinearRgbLookUpTable = sRgbToLinearRgbLookup()

    var rgb = Array(3)
    rgb[0] = sRgbToLinearRgbLookUpTable[srgb[r]]
    rgb[1] = sRgbToLinearRgbLookUpTable[srgb[g]]
    rgb[2] = sRgbToLinearRgbLookUpTable[srgb[b]]

    var params = brettelParams[t]
    var separationPlaneNormal = params["separationPlaneNormal"]
    var rgbCvdFromRgb_1 = params["rgbCvdFromRgb_1"]
    var rgbCvdFromRgb_2 = params["rgbCvdFromRgb_2"]

    // Check on which plane we should project by comparing wih the separation plane normal.
    var dotWithSepPlane =
        rgb[0] * separationPlaneNormal[0] + rgb[1] * separationPlaneNormal[1] + rgb[2] * separationPlaneNormal[2]
    var rgbCvdFromRgb = dotWithSepPlane >= 0 ? rgbCvdFromRgb_1 : rgbCvdFromRgb_2

    // Transform to the full dichromat projection plane.
    var rgb_cvd = Array(3)
    rgb_cvd[0] = rgbCvdFromRgb[0] * rgb[0] + rgbCvdFromRgb[1] * rgb[1] + rgbCvdFromRgb[2] * rgb[2]
    rgb_cvd[1] = rgbCvdFromRgb[3] * rgb[0] + rgbCvdFromRgb[4] * rgb[1] + rgbCvdFromRgb[5] * rgb[2]
    rgb_cvd[2] = rgbCvdFromRgb[6] * rgb[0] + rgbCvdFromRgb[7] * rgb[1] + rgbCvdFromRgb[8] * rgb[2]

    // Apply the severity factor as a linear interpolation.
    // It's the same to do it in the RGB space or in the LMS
    // space since it's a linear transform.
    rgb_cvd[0] = rgb_cvd[0] * severity + rgb[0] * (1.0 - severity)
    rgb_cvd[1] = rgb_cvd[1] * severity + rgb[1] * (1.0 - severity)
    rgb_cvd[2] = rgb_cvd[2] * severity + rgb[2] * (1.0 - severity)

    // Go back to sRGB
    return parse(`rgb(${linearRgbtosRgb(rgb_cvd[0])}, ${linearRgbtosRgb(rgb_cvd[1])}, ${linearRgbtosRgb(rgb_cvd[2])})`)
}
