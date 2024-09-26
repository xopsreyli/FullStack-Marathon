exports.checkDivision = (a = 1, b = 60) => {
    for (let i = a; i <= b; i++) {
        let isDivisibleBy2 = false
        let isDivisibleBy3 = false
        let isDivisibleBy10 = false

        if (i % 2 === 0) {
           isDivisibleBy2 = true
        }
        if (i % 3 === 0) {
            isDivisibleBy3 = true
        }
        if (i % 10 === 0) {
            isDivisibleBy10 = true
        }

        console.log(buildOutputStr(i, isDivisibleBy2, isDivisibleBy3, isDivisibleBy10))
    }
}

const buildOutputStr = (num, isDivisibleBy2, isDivisibleBy3, isDivisibleBy10) => {
    let output = `The number ${num} `

    if (!isDivisibleBy2 && !isDivisibleBy3 && !isDivisibleBy10) {
        return output + '-'
    }

    if (isDivisibleBy2) {
        output += 'is divisible by 2, '
    }
    if (isDivisibleBy3) {
        output += 'is divisible by 3, '
    }
    if (isDivisibleBy10) {
        output += 'is divisible by 10, '
    }

    return output.slice(0, -2)
}
