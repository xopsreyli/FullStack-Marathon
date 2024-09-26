const userModel = require("../models/userModel");
const cardModel = require('../models/cardModel')

const getPlayer = async login => {
    const user = await userModel.findByLogin(login)

    return {
        login: user.login,
        avatar: user.avatar
    }
}

const getCards = async () => {
    const cards = await cardModel.getAll()

    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [cards[i], cards[j]] = [cards[j], cards[i]];
    }

    return cards
}

module.exports = {
    getPlayer,
    getCards
}
