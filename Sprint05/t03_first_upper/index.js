exports.firstUpper = str => {
    if (!str) {
        return ''
    }

    str = str.trim()

    return str[0].toUpperCase() + str.slice(1).toLowerCase()
}
