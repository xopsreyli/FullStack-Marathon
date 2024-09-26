const Model = require('../model')

class User extends Model {
    constructor(id, email, login, fullName, password) {
        super()
        this.id = id
        this.email = email
        this.login = login
        this.fullName = fullName
        this.password = password
    }

    async checkIfExists() {
        return this.db.promise().query(
            `SELECT * FROM users WHERE email = :email OR login = :login`,
            {
                email: this.email,
                login: this.login
            }
        )
    }

    save() {
        this.db.query(
            'INSERT INTO users (email, login, full_name, password) VALUES (:email, :login, :fullName, :password)',
            {
                email: this.email,
                login: this.login,
                fullName: this.fullName,
                password: this.password
            },
            (err, result) => {
                if (err) {
                    throw err
                }

                this.id = result.insertId
            }
        )
    }
}

module.exports = User
