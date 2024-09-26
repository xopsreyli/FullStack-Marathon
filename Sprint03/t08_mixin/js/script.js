const houseMixin = {
    wordReplace(wordToReplace, replacingWord) {
        this.description = this.description.replace(wordToReplace, replacingWord)
    },
    wordInsertAfter(word, wordToInsert) {
        let words = this.description.trim().split(/\s+/)
        words.splice(words.indexOf(word) + 1, 0, wordToInsert)

        this.description = words.join(' ')
    },
    wordDelete(wordToDelete) {
        this.description = this.description.replace(wordToDelete, '')
    },
    wordEncrypt() {
        this.description = this.description.replace(/[a-z]/gi, letter => String.fromCharCode(letter.charCodeAt(0) + (letter.toLowerCase() <= 'm' ? 13 : -13)));
    },
    wordDecrypt() {
        this.description = this.description.replace(/[a-z]/gi, letter => String.fromCharCode(letter.charCodeAt(0) - (letter.toLowerCase() <= 'm' ? -13 : 13)));
    },
}
