const manager = require("../models/userModel");

const getUser = async (login) => {
    return manager.findByLogin(login)
};

module.exports = {
    getUser
}
