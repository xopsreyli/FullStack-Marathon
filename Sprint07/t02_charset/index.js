const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const iconv = require('iconv-lite')

const app = express()
const port = 3000

app.use(express.static(path.join(__dirname)))

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.post('/encode', (req, res) => {
    let result = {}
    result.string = req.body.string

    if (req.body.types.includes('utf-8')) {
        result.utf8 = req.body.string
    }
    if (req.body.types.includes('iso-8859-1')) {
        result.iso88591 = iconv.encode(iconv.decode(req.body.string, 'utf8'), 'ISO-8859-1').toString()
    }
    if (req.body.types.includes('windows-1252')) {
        result.win1252 = iconv.encode(iconv.decode(req.body.string, 'utf8'), 'windows-1252').toString()
    }

    res.status(200).json(result)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
