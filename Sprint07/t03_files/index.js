const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const File = require('./File.js')
const FileList = require('./FileList.js')

const app = express()
const port = 3000

app.use(express.static(path.join(__dirname)))

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/files', (req, res) => {
    const fileList = new FileList()

    res.json({ files: fileList.getHTMLList() })
})

app.get('/file', (req, res) => {
    const file = new File(req.query.file)

    res.json({
        filename: file.name,
        content: file.read()
    })
})

app.post('/file', (req, res) => {
    const file = new File(req.body.filename)
    file.write(req.body.content)

    res.status(200).send('File was created!')
})

app.delete('/file', (req, res) => {
    const file = new File(req.query.file)
    file.delete()

    res.status(200).send('File was deleted!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
