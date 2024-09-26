module.exports = class EatException extends Error {
    constructor() {
        super()
        this.message = 'No more junk food, dumpling'
    }
}
