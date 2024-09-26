class User {
    constructor(id, login, password, avatar, refreshToken) {
        this.id = id
        this.login = login
        this.password = password
        this.avatar = avatar
        this.refreshToken = refreshToken
    }

    static createUser(login, password) {
        return new User(null, login, password, 'default.svg', null)
    }
}

module.exports = User
