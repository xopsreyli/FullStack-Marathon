const rangeStart = parseInt(prompt('Enter beginning of the range:'))
const rangeEnd = parseInt(prompt('Enter end of the range:'))

const checkDivision = (rangeStart = 1, rangeEnd = 100) => {
    for (let i = rangeStart; i <= rangeEnd; i++) {
        let isEven = false
        let isMultipleOf3 = false
        let isMultipleOf10 = false

        if (i % 2 === 0) {
            isEven = true
        }
        if (i % 3 === 0) {
            isMultipleOf3 = true
        }
        if (i % 10 === 0) {
            isMultipleOf10 = true
        }

        console.log(buildOutputStr(i, isEven, isMultipleOf3, isMultipleOf10))
    }
}

const buildOutputStr = (num, isEven, isMultipleOf3, isMultipleOf10) => {
    let outputStr = `${num} `

    if (!isEven && !isMultipleOf3 && !isMultipleOf10) {
        return outputStr + '-'
    }

    outputStr += 'is'

    if (isEven) {
        outputStr += ' even,'
    }
    if (isMultipleOf3) {
        outputStr += ' a multiple of 3,'
    }
    if (isMultipleOf10) {
        outputStr += ' a multiple of 10,'
    }

    outputStr = outputStr.slice(0, -1)

    return outputStr
}

checkDivision(rangeStart, rangeEnd)
