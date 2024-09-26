const fs = require('fs')
const xml2js = require('xml2js')
const AvengerQuote = require("./AvengerQuote");
const Comment = require("./Comment");

module.exports = class ListAvengerQuotes {
    constructor() {
        this.quotes = [
            new AvengerQuote(0, 'Iron Man', 'I am Iron Man.', 'https://linktoimage.com/ironman.jpg', '2008-05-02', [new Comment('2008-05-02', 'Iconic scene')]),
            new AvengerQuote(1, 'Captain America', 'I can do this all day.', 'https://linktoimage.com/captain.jpg', '2011-07-22', [new Comment('2011-07-22', 'Inspirational')]),
            new AvengerQuote(2, 'Thor', 'Bring me Thanos!', 'https://linktoimage.com/thor.jpg', '2018-04-27', [new Comment('2018-04-27', 'Epic moment')]),
            new AvengerQuote(3, 'Hulk', 'Hulk smash!', 'https://linktoimage.com/hulk.jpg', '2012-05-04', [new Comment('2012-05-04', 'Smash hit')])
        ]
    }

    toXML(fileName) {
        const builder = new xml2js.Builder()
        const xml = builder.buildObject({ quotes: this.quotes })

        fs.writeFileSync(fileName, xml)
    }

    fromXML(fileName) {
        if (fs.existsSync(fileName)) {
            const fileData = fs.readFileSync(fileName).toString()
            const parser = new xml2js.Parser()
            let result = ''

            parser.parseString(fileData, (error, data) => {
                if (error) {
                    console.error(error)
                } else {
                    result = data
                }
            })

            return result
        }
    }
}
