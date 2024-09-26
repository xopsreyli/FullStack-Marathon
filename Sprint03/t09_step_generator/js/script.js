function* stepGenerator() {
    let prevResult = 1
    while (true) {
        const input = prompt(`Previous result: ${prevResult}. Enter a new number:`)

        if (isNaN(input) || !input) {
            if (input === 'exit') {
                break
            }

            console.error('Invalid number!')
        } else {
            prevResult += Number.parseInt(input)

            if (prevResult > 10000) {
                prevResult = 1
            }
        }
    }
}
