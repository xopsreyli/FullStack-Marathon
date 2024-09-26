const express = require('express')
const path = require('path')
const app = express()
const port = 3000
const nodemailer = require("nodemailer")
const User = require('./models/user')

app.use(express.json())
app.use(express.static('public'))

const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
        user: "gardner10@ethereal.email",
        pass: "yVVjrEJ3guykpjxj9h",
    },
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

app.get('/registration', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'registration.html'))
})

app.post('/api/registration', async (req, res) => {
    let user = new User(null, req.body.email, req.body.login, req.body.fullName, req.body.password)

    const data = await user.checkIfExists()

    if (data[0].length > 0) {
        return res.status(400).json({
            status: 400,
            message: 'User with such email or login already exists!'
        })
    }

    user.save()

    res.json({
        status: 200,
        message: 'Success!'
    })
})

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'))
})

app.post('/api/login', async (req, res) => {
    let user = new User()
    await user.getUserByLoginAndPassword(req.body.login, req.body.password)

    if (user.id) {
        return res.status(200).json({
            status: 200,
            user: {
                id: user.id,
                email: user.email,
                login: user.login,
                fullName: user.fullName,
                password: user.password,
                role: user.role
            }
        })
    }

    res.status(401).json({
        status: 401,
        message: 'Invalid credentials.'
    })
})

app.get('/password/remind', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'password-reminder.html'))
})

app.post('/api/password/remind', async (req, res) => {
    let user = new User()
    await user.findByEmail(req.body.email)

    if (user.id) {
        await transporter.sendMail({
            from: 'gardner10@ethereal.email',
            to: user.email,
            subject: "Password reminder",
            text: `Your password: ${user.password}`
        })

        return res.status(200).json({
            status: 200,
            message: 'Password was successfully sent!'
        })
    }

    res.status(404).json({
        status: 404,
        message: 'Wrong email. No such user.'
    })
})

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
