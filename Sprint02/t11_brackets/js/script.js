const checkBrackets = (str) => {
    const regex = /\(.*\)/

    if (typeof str !== 'string' || !regex.test(str)) {
        return -1
    }

    let count = 0
    let open = 0

    for (let i = 0; i < str.length; i++) {
        if (str[i] === '(') {
            open++
        } else if (str[i] === ')') {
            if (open <= 0) {
                count++
            } else {
                open--
            }
        }
    }

    return count + open
}
