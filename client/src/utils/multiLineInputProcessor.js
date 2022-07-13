function processInputsOnANewLine(input) {
    return input
                .split('\n')
                .map(content => content.trim())
                .filter(content => content.trim() !== '');
}

const multiLineInputProcessor = {
    process: (input) => processInputsOnANewLine(input)
}

export default multiLineInputProcessor;