import hexToOklch from "../../General/hexToOklch"
import calculateSecondaryShades from "../calculateSecondaryShades"

export default () => {
    self.addEventListener("message", (e) => {
        const {
            primaryShades,
            color,
            lightBg,
            darkBg,
            lightnessTolerance,
            chromacityTolerance,
            hueTolerance,
            T,
            T_min,
            alpha,
            targetColorGamut,
            counterObject,
        } = e.data
        const result = calculateSecondaryShades(
            primaryShades,
            hexToOklch(color),
            lightBg,
            darkBg,
            lightnessTolerance,
            chromacityTolerance,
            hueTolerance,
            T,
            T_min,
            alpha,
            targetColorGamut,
            counterObject
        )

        postMessage(result)
    })
}
