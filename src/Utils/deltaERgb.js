import { differenceEuclidean } from "culori"

export default function deltaERgb(colorA, colorB) {
    const calculateDeltaE = differenceEuclidean("rgb")

    return calculateDeltaE(colorA, colorB)
}
