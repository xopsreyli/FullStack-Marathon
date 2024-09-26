const express = require('express')
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const csv = require('csv-parser')

const app = express()
const port = 3000

app.use(express.static(path.join(__dirname)))

app.use(bodyParser.json())

let csvData = []

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.post('/upload', (req, res) => {
    const file = req.body.file
    const filePath = path.join(__dirname, 'uploaded.csv')

    const base64Data = file.replace(/^data:text\/csv;base64,/, '')
    fs.writeFileSync(filePath, base64Data, 'base64')

    csvData = []
    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
            csvData.push(row)
        })
        .on('end', () => {
            fs.unlinkSync(filePath)
            res.json({ success: true, data: csvData })
        })
})

app.get('/filter', (req, res) => {
    const { column, value } = req.query
    const filteredData = csvData.filter(row => row[column] === value)

    res.json({ success: true, data: filteredData })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
