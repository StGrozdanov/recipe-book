export function summary(content, requiredLength) {
    return content.length > requiredLength ? content.substring(0, requiredLength) + '...' : content;
}