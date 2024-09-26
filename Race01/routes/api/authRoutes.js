require('dotenv').config()

const express = require('express')
const router = express.Router()
const authenticateToken = require('../../utils/authenticateToken')
const service = require('../../services/authService')
const userService = require('../../services/userService')
const User = require('../../entities/User')

router.post('/registration', async (req, res) => {
    const user = User.createUser(req.body.login, req.body.password)

    const response = await service.registration(user)

    if (typeof response === 'string') {
        return res.status(409).json({
            status: 409,
            message: response
        })
    }

    return res.json({
        status: 200,
        user: response
    })
})

router.post('/login', async (req, res) => {
    const user = await userService.getUser(req.body.login)

    if (!user) {
        return res.status(400).json({
            status: 400,
            message: 'Invalid login credentials. No such user!'
        })
    }

    const tokens = await service.login(user, req.body.password)

    if (tokens) {
        return res.json({
            status: 200,
            user: {
                login: user.login,
                avatar: user.avatar,
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken
            }
        })
    }

    return res.json({
        status: 401,
        message: 'Invalid login credentials'
    })
})

router.post('/token/update', async (req, res) => {
    const refreshToken = req.body.token

    if (!refreshToken) {
        return res.sendStatus(401)
    }

    const user = await service.isRefreshToken(refreshToken)

    if (!user) {
        return res.sendStatus(403)
    }

    const accessToken = service.updateToken(user)

    if (!accessToken) {
        return res.sendStatus(403)
    }

    return res.json({accessToken: accessToken})
})

router.delete('/logout', authenticateToken, (req, res) => {
    service.logout(req.body.token)

    return res.sendStatus(200)
})

module.exports = router
