require('dotenv').config();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const manager = require('../models/userModel');

const registration = async (user) => {
    const existingUser = await manager.findByLogin(user.login)

    if (existingUser) {
        return 'User with such login already exists!'
    }

    user.password = await bcrypt.hash(user.password, 10)

    const accessToken = jwt.sign(
        { login: user.login },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
    )
    user.refreshToken = jwt.sign(
        { login: user.login },
        process.env.REFRESH_TOKEN_SECRET
    )

    manager.create(user)

    return {
        login: user.login,
        avatar: user.avatar,
        accessToken: accessToken,
        refreshToken: user.refreshToken,
    }
}

const login = async (user, password) => {
    if (await bcrypt.compare(password, user.password)) {
        const accessToken = jwt.sign(
            { login: user.login },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
        )
        user.refreshToken = jwt.sign(
            { login: user.login },
            process.env.REFRESH_TOKEN_SECRET
        )

        manager.saveRefreshToken(user)

        return {
            accessToken: accessToken,
            refreshToken: user.refreshToken,
        }
    }

    return null;
}

const isRefreshToken = async (token) => {
    return manager.findByRefreshToken(token);
}

const updateToken = (user) => {
    let token = null

    jwt.verify(
        user.refresh_token,
        process.env.REFRESH_TOKEN_SECRET,
        (err, user) => {
            if (err) {
                return
            }

            token = jwt.sign({ login: user.login }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '15m',
            })
        }
    );

    return token
};

const logout = (token) => {
    manager.deleteRefreshToken(token)
}

module.exports = {
    registration,
    login,
    isRefreshToken,
    updateToken,
    logout,
}
