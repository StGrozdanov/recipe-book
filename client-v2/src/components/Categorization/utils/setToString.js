export function setToString(set) {
    return Array.from(set).map((value, index) => index < set.size - 1 ? value + ', ' : value)
}