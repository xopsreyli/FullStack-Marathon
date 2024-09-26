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

app.get('/registration', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'registration.html'))
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

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
