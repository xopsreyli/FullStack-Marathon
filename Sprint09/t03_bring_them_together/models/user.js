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
            'INSERT INTO users (email, login, full_name, password, role) VALUES (:email, :login, :fullName, :password, "USER")',
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

    async findByEmail(email) {
        const result = await this.db.promise().query(
            `SELECT * FROM users WHERE email = :email`,
            {
                email: email
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
