export default function replaceClosestInteger(arr, num) {
    const getDistance = (a, b) => Math.abs(a - b)

    const closestValue = arr.reduce((acc, curr) => (getDistance(acc, num) < getDistance(curr, num) ? acc : curr))

    return arr.map((value) => (value === closestValue ? num : value))
}
