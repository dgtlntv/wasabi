import { expose } from "comlink"
import { calculateSecondaryShades } from "../calculateSecondaryShades"

const worker = {
    calculateSecondaryShades,
}

expose(worker)
