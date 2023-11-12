export default function sortTargetContrastShades(contrastShades) {
    const shadesLowestToHighest = [...contrastShades].sort((a, b) => a - b)
    const shadesHighestToLowest = [...contrastShades].sort((a, b) => b - a)

    return [...shadesHighestToLowest, ...shadesLowestToHighest]
}
