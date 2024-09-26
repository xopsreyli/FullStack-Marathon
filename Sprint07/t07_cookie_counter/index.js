const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')

const app = express()
const port = 3000
let uid = 0

app.use(express.static(path.join(__dirname)))
app.use(cookieParser())

app.get('/', (req, res) => {
    const cookies = req.cookies
    let count = Object.keys(cookies).filter(name => name.startsWith('cookie_')).length + 1

    res.cookie(`cookie_${uid++}`, 'cookie', { maxAge: 60000 })

    res.send(`This page was loaded ${count} time(s) in last minute`)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
