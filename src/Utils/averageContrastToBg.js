import { calcAPCA } from "apca-w3"

export default function averageContrastToBg(colorArray, bg) {
    let totalContrast = 0

    for (let i = 0; i < colorArray.length; i++) {
        totalContrast += calcAPCA(bg, colorArray[i])
    }

    return colorArray.length > 0 ? totalContrast / colorArray.length : 0
}
