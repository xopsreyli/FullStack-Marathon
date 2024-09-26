class Player {
    constructor(login, avatar) {
        this.login = login
        this.avatar = avatar
        this.healthPoints = 20
        this.mana = 10
        this.cards = []
        this.activeCards = []
    }

    addMana() {
        if (this.mana === 9) {
            return this.mana = 10
        }

        if (this.mana < 9) {
            this.mana += 2
        }
    }
}

module.exports = Player
