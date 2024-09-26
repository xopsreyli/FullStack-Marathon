const db = require('../db')

const getAll = async () => {
    const [rows] = await db.promise().query(
        'SELECT * FROM cards'
    )

    return rows
}

module.exports = {
    getAll
}
