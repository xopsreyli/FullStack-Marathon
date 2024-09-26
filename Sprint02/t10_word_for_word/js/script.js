const addWords = (obj, wrds) => {
    let words = obj.words.split(/\s+/)
    let wordsToAdd = wrds.split(/\s+/)
    obj.words = removeDuplicates(words.concat(wordsToAdd)).join(' ')
}

const removeWords = (obj, wrds) => {
    let words = obj.words.split(/\s+/)
    let wordsToRemove = wrds.split(/\s+/)
    obj.words = removeDuplicates(words.filter(word => !wordsToRemove.includes(word))).join(' ')
}

const changeWords = (obj, oldWrds, newWrds) => {
    removeWords(obj, oldWrds)
    addWords(obj, newWrds)
}

const removeDuplicates = (arr) => {
    return arr.filter((item, index) => arr.indexOf(item) === index)
}
