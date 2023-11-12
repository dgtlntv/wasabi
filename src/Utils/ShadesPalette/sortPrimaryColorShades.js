export default function sortPrimaryShades(shades) {
    return [...shades].sort((a, b) => a.name - b.name)
}
