const output = document.querySelector('.output')
const history = document.querySelector('.history')

let inputValue = null
let result = 0
let operation = null

const observer = new MutationObserver(() => {
    if (Number(output.textContent) === 0) {
        output.style.color = '#333';
    } else if (Number(output.textContent) > 0) {
        output.style.color = 'lightgreen';
    } else {
        output.style.color = 'crimson';
    }
});

observer.observe(output, {
    childList: true,
    subtree: true,
    characterData: true
});

const append = (value) => {
    if (inputValue && inputValue.toString().length === 12) {
        return
    }

    if (output.textContent === '0' && value !== '.') {
        output.textContent = value
    } else {
        if (value === '.' && output.textContent.includes('.')) {
            return
        }
        output.textContent += value
    }

    inputValue = Number(output.textContent)
    history.textContent += value
}

const clearOutput = () => {
    history.textContent = ''
    result = 0
    operation = null
    resetInputValue()
}

const resetInputValue = () => {
    inputValue = null
    output.textContent = '0'
}

const mulByMinusOne = () => {
    if (inputValue === 0) {
        return
    }
    inputValue *= -1
    output.textContent = inputValue.toString()
}

const getPercent = () => {
    if (history.textContent.slice(-1) !== '%' && inputValue) {
        history.textContent += '%'

        if (!operation) {
            inputValue /= 100
            return output.textContent = inputValue.toString()
        }

        inputValue = result * inputValue / 100
        output.textContent = inputValue.toString()
    }
}

const getFactorial = () => {
    if (inputValue >= 0) {
        history.textContent += '!'

        if (inputValue === 0) {
            inputValue = 1
            return output.textContent = '1'
        }

        let factorial = 1
        for (let i = 1; i <= inputValue; i++) {
            factorial *= i
        }

        inputValue = factorial
        output.textContent = inputValue.toString()
    }
}

const getRoot = () => {
    if (inputValue > 0) {
        const length = inputValue.toString().length
        history.textContent = history.textContent.slice(0, length * (-1)) + `√${inputValue}`

        inputValue = Math.sqrt(inputValue)
        output.textContent = inputValue.toString().slice(0, 12)
    }
}

const countResult = () => {
    if (!inputValue) {
        return
    }

    if (operation === '+') {
        result += inputValue
    } else if (operation === '-') {
        result -= inputValue
    } else if (operation === '*') {
        result *= inputValue
    } else if (operation === '/') {
        result /= inputValue
    }
}

const setOperation = (op) => {
    if (operation) {
        countResult()
    } else {
        result = inputValue
    }

    resetInputValue()
    operation = op
    if (history.textContent.slice(-1) !== ' ') {
        history.textContent += ` ${op} `
    } else {
        history.textContent = history.textContent.slice(0, -3) + ` ${op} `
    }
}

const showResult = () => {
    if (!operation) {
        return
    }
    countResult()
    output.textContent = result.toString().slice(0, 12)
    inputValue = result
    operation =  null
}
