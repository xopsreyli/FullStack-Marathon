const { createServer } = require('node:http')
const fs = require('fs')
const ejs = require('ejs')
const path = require('path')
const handleNormalRoute = require('./normal-router')
const handleQuantumRoute = require('./quantum-router')

const hostname = '127.0.0.1'
const port = 3000

const server = createServer((req, res) => {
    if (req.url === '/') {
        fs.readFile(path.join(__dirname, 'views', 'index.ejs'), 'utf-8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            } else {
                const renderedHtml = ejs.render(data);
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(renderedHtml);
            }
        })
    } else if (req.url === '/normal') {
        handleNormalRoute(req, res)
    } else if (req.url === '/quantum') {
        handleQuantumRoute(req, res)
    }
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})
