export function summary(content) {
    return content.length > 23 ? content.substring(0, 23) + '...' : content;
}