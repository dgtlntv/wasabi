import calcApcaP3 from "./calcApcaP3"
import calclApcaSRGB from "./calcApcaSRGB"

export default function calcApca(fg, bg, targetColorGamut) {
    switch (targetColorGamut) {
        case "p3":
            return calcApcaP3(fg, bg)
        case "srgb":
            return calclApcaSRGB(fg, bg)
    }
}
