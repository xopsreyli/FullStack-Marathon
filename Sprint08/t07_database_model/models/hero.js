const Model = require('../model')

class Hero extends Model {
    constructor(id, name, description, classRole, race) {
        super()
        this.id = id
        this.name = name
        this.description = description
        this.classRole = classRole
        this.race = race
    }

    find(id) {
        this.db.query(
            'SELECT heroes.*, races.name AS race_name FROM heroes INNER JOIN races ON heroes.race_id = races.id WHERE heroes.id = :id',
            {
                id: id
            },
            (err, result) => {
                if (err) {
                    throw err
                }

                this.id = result[0].id
                this.name = result[0].name
                this.description = result[0].description
                this.classRole = result[0].class_role
                this.race = {
                    id: result[0].race_id,
                    name: result[0].race_name
                }
            }
        )
    }

    delete() {
        if (!this.id) {
            throw new Error('ID is not set!')
        }

        this.db.query('DELETE FROM heroes WHERE id = :id', { id: this.id })
    }

    save() {
        if (this.id) {
            return this.db.query(
                'UPDATE heroes SET id = :id, name = :name, description = :description, class_role = :classRole, race_id = :raceId WHERE id = :id',
                {
                    id: this.id,
                    name: this.name,
                    description: this.description,
                    classRole: this.classRole,
                    raceId: this.race.id
                }
            )
        }

        this.db.query(
            'INSERT INTO heroes (name, description, class_role, race_id) VALUES (:name, :description, :classRole, :raceId)',
            {
                name: this.name,
                description: this.description,
                classRole: this.classRole,
                raceId: this.race.id
            },
            (err, result) => {
                if (err) {
                    throw err
                }

                this.id = result.insertId
            }
        )
    }
}

module.exports = Hero
