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

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
