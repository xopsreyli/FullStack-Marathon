const EatException = require('./eat-exception')

class Ingestion {
    constructor(meal_type, dayOfDiet) {
        this.id = 0
        this.meal_type = [meal_type]
        this.day_of_diet = dayOfDiet
        this.products = []
    }

    setProduct(product) {
        this.products.push(product)
    }

    getProductInfo(name) {
        return this.products.find(product => product.name === name)
    }

    getFromFridge(product) {
        if (this.products.find(el => el.name === product).kcal > 200) {
            const ex = new EatException()
            ex.message = `Too many calories in ${product} for ${this.meal_type[0]}`
            throw ex
        }
    }
}

module.exports = {
    Ingestion
}
