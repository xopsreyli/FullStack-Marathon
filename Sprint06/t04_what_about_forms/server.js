const { createServer } = require('node:http')
const fs = require('fs')
const path = require('path')

const hostname = '127.0.0.1'
const port = 3000

const server = createServer((req, res) => {
    let filePath = path.join(__dirname, (req.url === '/' ? 'index.html' : req.url) )
    let ext = path.extname(filePath)
    let contentType = 'text/html'

    if (!ext) {
        filePath += '.html'
    }

    switch (ext) {
        case '.js':
            contentType = 'text/javascript'
            break
        default:
            contentType = 'text/html'
    }

    fs.readFile(filePath, (err, data) => {
        res.writeHead(200, {
            'Content-Type': contentType
        })
        res.end(data)
    })
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})
