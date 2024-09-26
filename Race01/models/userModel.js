const db = require('../db')

const create = user => {
    db.query(
        'INSERT INTO users(login, password, avatar, refresh_token) VALUES(:login, :password, :avatar, :refreshToken)',
        {
            login: user.login,
            password: user.password,
            avatar: user.avatar,
            refreshToken: user.refreshToken
        }
    )
}

const findByLogin = async login => {
    const [rows] = await db.promise().query(
        'SELECT * FROM users WHERE login = :login',
        {login: login}
    )

    return rows[0]
}

const saveRefreshToken = user => {
    db.query(
        'UPDATE users SET refresh_token = :refreshToken WHERE login = :login',
        {
            login: user.login,
            refreshToken: user.refreshToken
        }
    )
}

const findByRefreshToken = async token => {
    const [rows] = await db.promise().query(
        'SELECT * FROM users WHERE refresh_token = :token',
        {token: token}
    )

    return rows[0]
}

const deleteRefreshToken = token => {
    db.query(
        'UPDATE users SET refresh_token = NULL WHERE refresh_token = :token',
        {token: token}
    )
}

const updateAvatar = (login, avatar) => {
    db.query(
        'UPDATE users SET avatar = :avatar WHERE login = :login',
        {
            login: login,
            avatar: avatar
        }
    )
}

module.exports = {
    create,
    findByLogin,
    saveRefreshToken,
    findByRefreshToken,
    deleteRefreshToken,
    saveAvatar: updateAvatar
}
