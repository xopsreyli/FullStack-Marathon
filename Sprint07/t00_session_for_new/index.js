const express = require('express')
const session = require('express-session')
const path = require('path')
const bodyParser = require('body-parser')

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

app.get('/', (req, res) => {
    if (req.session.hero) {
        res.sendFile(path.join(__dirname, 'data.html'))
    } else {
        res.sendFile(path.join(__dirname, 'form.html'))
    }
})

app.post('/new-hero', (req, res) => {
    req.session.hero = req.body
    res.status(200).send('Hero was saved!')
})

app.get('/hero', (req, res) => {
    if (req.session.hero) {
        res.json(req.session.hero)
    } else {
        res.status(404).send('Not found!')
    }
})

app.get('/remove-hero', (req, res) => {
    if (req.session.hero) {
        delete req.session.hero
        res.status(200).send('Removed!')
    } else {
        res.status(404).send('No hero found in session!');
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
