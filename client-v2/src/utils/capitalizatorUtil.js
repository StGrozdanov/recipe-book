export function capitalizatorUtil(sentence) {
    return sentence ? sentence = sentence[0].toUpperCase() + sentence.substring(1, sentence.length) : undefined
}