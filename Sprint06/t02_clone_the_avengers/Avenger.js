class Callable extends Function {
    constructor() {
        super('...args', 'return this._bound.call(...args)')
        this._bound = this.bind(this)

        return this._bound
    }
}

class Avenger extends Callable {
    constructor(name, alias, gender, age, powers, hp) {
        super()
        this._name = name
        this.alias = alias
        this.gender = gender
        this.age = age
        this.power = powers
        this.hp = hp
    }

    toString() {
        return `name: ${this._name} \n` +
            `gender: ${this.gender} \n` +
            `age: ${this.age}`
    }

    call() {
        return `${this.alias.toUpperCase()}\n` + this.power.join('\n')
    }
}

module.exports = {
    Avenger
}
