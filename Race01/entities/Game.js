class Game {
    constructor(players, cards) {
        this.players = players
        this.cards = cards
        this.turn = this.players[Math.floor(Math.random() * this.players.length)].login

        this.dealCards()
    }

    dealCards() {
        this.players.forEach(player => {
            player.cards = this.cards.splice(0, 5)
        })
    }
}

module.exports = Game
