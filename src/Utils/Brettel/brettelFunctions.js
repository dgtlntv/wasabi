import brettel from "./brettel"

export function Protanopia(v) {
    return brettel(v, "protan", 1.0)
}

export function Protanomaly(v) {
    return brettel(v, "protan", 0.6)
}

export function Deuteranopia(v) {
    return brettel(v, "deutan", 1.0)
}

export function Deuteranomaly(v) {
    return brettel(v, "deutan", 0.6)
}

export function Tritanopia(v) {
    return brettel(v, "tritan", 1.0)
}

export function Tritanomaly(v) {
    return brettel(v, "tritan", 0.6)
}

export function Achromatopsia(v) {
    return monochromeWithSeverity(v, 1.0)
}

export function Achromatomaly(v) {
    return monochromeWithSeverity(v, 0.6)
}
