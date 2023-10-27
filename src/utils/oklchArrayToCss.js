export default function oklchArrayToCss(oklch) {
    return "oklch(" + oklch[0] * 100 + "% " + oklch[1] + " " + oklch[2] + ")"
}
