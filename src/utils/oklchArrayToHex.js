import { converter, formatHex } from "culori"
import oklchArrayToCss from "./oklchArrayToCss"

export default function oklchArrayToHex(oklchArray) {
    const rgb = converter("rgb")

    return formatHex(rgb(oklchArrayToCss(oklchArray)))
}
