const num = 6
const bigInt = 1234567890123456789012345678901234567890n
const str = 'Chinazes!'
const bool = true
const nolik = null
const undefinedVar = undefined
const obj = { car: 'BMW'}
const symb = Symbol('symbol')
const sum = (a, b) => {
    return a + b
}

alert(
    `
    num is ${typeof num}\n
    bigInt is ${typeof bigInt}\n
    str is ${typeof str}\n
    bool is ${typeof bool}\n
    nolik is ${typeof nolik}\n
    undefinedVar is ${typeof undefinedVar}\n
    obj is ${typeof obj}\n
    symb is ${typeof symb}\n
    sum is ${typeof sum}\n
    `
)
