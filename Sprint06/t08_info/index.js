const { createServer } = require('node:http')
const os = require('os')
const url = require('url')
const process = require('node:process')

const hostname = '127.0.0.1'
const port = 3000

const getServerIp = () => {
    const interfaces = os.networkInterfaces()

    for (let iface in interfaces) {
        for (let alias of interfaces[iface]) {
            if (alias.family === 'IPv4' && !alias.internal) {
                return alias.address
            }
        }
    }

    return '127.0.0.1'
}

const server = createServer((req, res) => {
    const filename = process.argv[1]
    const args = process.argv.slice(2)
    const serverIp = getServerIp()
    const hostName = req.headers.host
    const protocol = `HTTP/${req.httpVersion}`
    const queryMethod = req.method
    const userAgent = req.headers['user-agent']
    const clientIp = req.socket.remoteAddress
    const urlParams = JSON.stringify(url.parse(req.url, true).query)


    console.log(`
        A name of executed script: ${filename}\n
        Arguments passed to the script: ${args}\n
        IP address of the server: ${serverIp}\n
        Host name: ${hostName}\n
        Name and version of the protocol: ${protocol}\n
        Query method: ${queryMethod}\n
        User-Agent info: ${userAgent}\n
        IP address of the client: ${clientIp}\n
        Parameters: ${urlParams}
    `)

    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    res.end('Check console!')
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})
