const express = require('express')
const session = require('express-session')
const path = require('path')
const bodyParser = require('body-parser')
const crypto = require('crypto')

const app = express()
const port = 3000

app.use(
    session({
        secret: 'secret1234',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }
    })
)

app.use(express.static(path.join(__dirname)))

app.use(bodyParser.json())

function hashPassword(password, salt) {
    const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512')
    return hash.toString('hex')
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.post('/add', (req, res) => {
    req.session.salt = req.body.salt
    req.session.password = hashPassword(req.body.password, req.body.salt)

    res.status(200).json({password: req.session.password})
})

app.get('/password', (req, res) => {
    if (req.session.password) {
        res.status(200).json({password: req.session.password})
    } else {
        res.status(404).json({error: 'Not found!'})
    }
})

app.post('/check', (req, res) => {
    const password = hashPassword(req.body.password, req.session.salt)

    if (password === req.session.password){
        delete req.session.password
        delete req.session.salt

        res.status(200).send('Match!')
    } else {
        res.status(404).send('Does not match!')
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
