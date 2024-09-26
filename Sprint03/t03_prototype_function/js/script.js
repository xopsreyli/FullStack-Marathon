String.prototype.removeDuplicates = function () {
    let words = this.toString().trim().split(/\s+/)
    words = words.filter((item, index) => words.indexOf(item) === index)

    return words.join(' ')
}
