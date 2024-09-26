const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const ListAvengerQuotes = require('./ListAvengerQuotes')
const AvengerQuote = require("./AvengerQuote")
const Comment = require("./Comment")

const app = express()
const port = 3000

app.use(express.static(path.join(__dirname)))

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/quotes', (req, res) => {
    const listAQ = new ListAvengerQuotes()
    const beforeXML = listAQ.quotes
    listAQ.toXML('avenger_quote.xml')

    res.json({
        beforeXML: beforeXML,
        afterXML: listAQ.fromXML('avenger_quote.xml')
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
