import { converter } from "culori"
import oklchArrayToCss from "./oklchArrayToCss"

export default function oklchArrayToRgb(oklchArray) {
    const rgb = converter("rgb")

    return rgb(oklchArrayToCss(oklchArray))
}
