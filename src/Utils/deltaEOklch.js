import { differenceEuclidean } from "culori"

// i probably need to convert an oklch array to a culori color

export default function deltaEOklch(colorA, colorB) {
    const calculateDeltaE = differenceEuclidean("oklch")

    return calculateDeltaE(colorA, colorB)
}
