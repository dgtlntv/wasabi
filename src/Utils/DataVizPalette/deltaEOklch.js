import { differenceEuclidean } from "culori"

export default function deltaEOklch(colorA, colorB) {
    const calculateDeltaE = differenceEuclidean("oklch")

    return calculateDeltaE(colorA, colorB)
}
