const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const NotePad = require('./NotePad')

const app = express()
const port = 3000

app.use(express.static(path.join(__dirname)))

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/note', (req, res) => {
    const notePad = new NotePad()

    res.json(notePad.getNote(req.query.name))
})

app.post('/note', (req, res) => {
    const notePad = new NotePad()
    notePad.createNote(req.body)

    res.status(200).send('Note was created!')
})

app.delete('/note', (req, res) => {
    const notePad = new NotePad()
    notePad.deleteNote(req.query.name)

    res.status(200).send('Note was deleted!')
})

app.get('/notes', (req, res) => {
    const notePad = new NotePad()

    res.json(notePad.getNotes())
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
