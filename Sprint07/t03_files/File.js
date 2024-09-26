const fs = require('fs')

module.exports =  class File {
    constructor(name) {
        this.name = name

        if (!fs.existsSync('./tmp')) {
            fs.mkdirSync('./tmp', { recursive: true })
        }

        fs.appendFileSync(`./tmp/${name}`, '')
    }

    write(content) {
        if (fs.existsSync(`./tmp/${this.name}`)) {
            fs.appendFileSync(`./tmp/${this.name}`, content)
        }
    }

    read() {
        return fs.readFileSync(`./tmp/${this.name}`, 'utf8')
    }

    delete() {
        fs.unlinkSync(`./tmp/${this.name}`)
    }
}
