const fs = require('fs')

module.exports = class FileList {
    getList() {
        if (fs.existsSync('./tmp')) {
            return fs.readdirSync('./tmp')
        }
    }

    hasFiles() {
        return !!fs.readdirSync('./tmp').length
    }

    getHTMLList() {
        if (fs.existsSync('./tmp')) {
            const files = fs.readdirSync('./tmp')
            let html = '<ul>'

            files.forEach(file => {
                html += `<li><a href="/file?file=${file}">${file}</a></li>`
            })

            html += '</ul>'

            return html
        }
    }
}
