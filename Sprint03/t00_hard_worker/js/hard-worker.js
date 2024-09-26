class HardWorker {
    #name
    #age
    #salary

    get name() {
        return this.#name
    }

    set name(name) {
        this.#name = name
    }

    get age() {
        return this.#age
    }

    set age(age) {
        if (1 <= age && age < 100) {
            this.#age = age
        }
    }

    get salary() {
        return this.#salary
    }

    set salary(salary) {
        if (100 <= salary && salary < 10000) {
            this.#salary = salary
        }
    }

    toObject() {
        return {
            name: this.#name,
            age: this.#age,
            salary: this.#salary,
        }
    }
}
