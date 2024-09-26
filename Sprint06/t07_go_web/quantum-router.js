const fs = require('fs')
const ejs = require('ejs')
const path = require('path')

const calculateTime = () => {
    const firstJan1939 = new Date(1939, 0, 1)
    const now = new Date()

    const differenceInMilliseconds = (now - firstJan1939) / 7

    const millisecondsPerDay = 1000 * 60 * 60 * 24
    const millisecondsPerMonth = millisecondsPerDay * 30.436875
    const millisecondsPerYear = millisecondsPerDay * 365.25

    const years = Math.floor(differenceInMilliseconds / millisecondsPerYear)
    const months = Math.floor((differenceInMilliseconds % millisecondsPerYear) / millisecondsPerMonth)
    const days = Math.floor(((differenceInMilliseconds % millisecondsPerYear) % millisecondsPerMonth) / millisecondsPerDay)

    return [years, months, days]
}

const handleQuantumRoute = (req, res) => {
    fs.readFile(path.join(__dirname, 'views', 'quantum.ejs'), 'utf-8', (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' })
            res.end('Internal Server Error')
        } else {
            const quantum = calculateTime()
            const renderedHtml = ejs.render(data, { quantum })
            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.end(renderedHtml)
        }
    })
}

module.exports = handleQuantumRoute
