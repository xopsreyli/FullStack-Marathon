module.exports = class StrFrequency {
    constructor(string) {
        this.string = string
    }

    letterFrequencies() {
        let result = {}
        const str = this.string.toUpperCase()

        for (let i = 0; i < str.length; i++) {
            if (/[A-Z]/.test(str[i])) {
                if (str[i] in result) {
                    result[str[i]]++
                } else {
                    result[str[i]] = 1
                }
            }
        }

        return result
    }

    wordFrequencies() {
        if (!this.string) {
            return {'': 1}
        }

        let result = {}
        const str = this.string.toUpperCase()
        const words = str.trim().match(/[A-Z]+/g)

        for (const word of words) {
            if (word) {
                if (word in result) {
                    result[word]++
                } else {
                    result[word] = 1
                }
            }
        }

        return result
    }

    reverseString() {
        return this.string.split('').reverse().join('')
    }
}
