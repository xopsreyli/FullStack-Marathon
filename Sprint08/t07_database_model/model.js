const db = require('./db.js')

class Model {
    constructor() {
        this.db = db
    }

    find(id) {}

    delete() {}

    save() {}
}

module.exports = Model
