const express = require('express')
const path = require('path')
const app = express()
const port = 3000
const User = require('./models/user')

app.use(express.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'))
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

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
