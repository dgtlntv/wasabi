export default function sortSecondaryShades(secondaryShadeArray) {
    const sortedSecondaryShadeArray = []

    for (const [index, secondaryShades] of Object.entries(secondaryShadeArray)) {
        const sortedSecondaryShades = [...secondaryShades].sort((a, b) => a.name - b.name)
        sortedSecondaryShadeArray.push(sortedSecondaryShades)
    }

    return sortedSecondaryShadeArray
}
