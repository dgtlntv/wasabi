import { expose } from "comlink"
import calculateDataVizPalette from "../calculateDataVizPalette"

const worker = {
    calculateDataVizPalette,
}

expose(worker)
