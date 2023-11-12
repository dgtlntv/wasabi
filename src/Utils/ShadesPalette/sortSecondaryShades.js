export default function sortSecondaryShades(secondaryShadeArray) {
    return [...secondaryShadeArray].sort((a, b) => a.name - b.name)
}
