class Team {
    constructor(id, avengers) {
        this.id = id
        this.avengers = avengers
    }

    battle(damage) {
        this.avengers = this.avengers.filter(avenger => {
            avenger.hp -= damage.damage

            return avenger.hp > 0
        })
    }

    calculateLosses(clonedTeam) {
        if (this.avengers.length === clonedTeam.length) {
            return console.log('We haven\'t lost anyone in this battle!')
        }

        console.log(`In this battle we lost ${clonedTeam.length - this.avengers.length} Avengers`)
    }

    clone() {
        return [...this.avengers]
    }
}

module.exports = {
    Team
}
