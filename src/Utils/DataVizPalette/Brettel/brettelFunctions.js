import brettel from "./brettel"

export function Protanopia(color) {
    return brettel(color, "protan", 1.0)
}

export function Protanomaly(color) {
    return brettel(color, "protan", 0.6)
}

export function Deuteranopia(color) {
    return brettel(color, "deutan", 1.0)
}

export function Deuteranomaly(color) {
    return brettel(color, "deutan", 0.6)
}

export function Tritanopia(color) {
    return brettel(color, "tritan", 1.0)
}

export function Tritanomaly(color) {
    return brettel(color, "tritan", 0.6)
}

export function Achromatopsia(color) {
    return monochromeWithSeverity(color, 1.0)
}

export function Achromatomaly(color) {
    return monochromeWithSeverity(color, 0.6)
}
