const Model = require('../model')

class User extends Model {
    constructor(id, email, login, fullName, password, role) {
        super()
        this.id = id
        this.email = email
        this.login = login
        this.fullName = fullName
        this.password = password
        this.role = role
    }

    async getUserByLoginAndPassword(login, password) {
        const result = await this.db.promise().query(
            `SELECT * FROM users WHERE login = :login AND password = :password`,
            {
                login: login,
                password: password
            }
        )

        if (result[0][0]) {
            this.id = result[0][0].id
            this.email = result[0][0].email
            this.login = result[0][0].login
            this.fullName = result[0][0].full_name
            this.password = result[0][0].password
            this.role = result[0][0].role
        }
    }
}

module.exports = User
