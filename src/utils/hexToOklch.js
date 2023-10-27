import { converter } from "culori"

export default function hexToOklch(hex) {
    const oklch = converter("oklch")

    return oklch(hex)
}
