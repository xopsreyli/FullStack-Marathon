const LLData = require('./LLData')

class LList {
    constructor() {
        this.head = null
        this.length = 0
    }

    getFirst() {
        return this.head.data
    }

    getLast() {
        let temp = this.head

        while (temp.next) {
            temp = temp.next
        }

        return temp.data
    }

    add(value) {
        this.length++

        if (!this.head) {
            return this.head = new LLData(value)
        }

        let temp = this.head

        while (temp.next) {
            temp = temp.next
        }

        temp.next = new LLData(value)
    }

    addFromArray(arrayOfData) {
        arrayOfData.forEach(value => this.add(value))
    }

    remove(value) {
        if (!this.head) {
            return
        }

        let temp = this.head

        while (temp.next.data !== value) {
            temp = temp.next
        }

        let itemToRemove = temp.next
        temp.next = itemToRemove.next
        itemToRemove.next = null

        this.length--
    }

    removeAll(value) {
        if (!this.head) {
            return
        }

        while (this.head && this.head.data === value) {
            this.head = this.head.next
            this.length--
        }

        let temp = this.head

        while (temp && temp.next) {
            if (temp.next.data === value) {
                let itemToRemove = temp.next
                temp.next = itemToRemove.next
                itemToRemove.next = null
                this.length--
            } else {
                temp = temp.next
            }
        }
    }

    contains(value) {
        if (!this.head) {
            return false
        }

        let temp = this.head

        while (temp) {
            if (temp.data === value) {
                return true
            }

            temp = temp.next
        }

        return false
    }

    clear() {
        this.head = null
        this.length = 0
    }

    count() {
        return this.length
    }

    toString() {
        let output = ''
        let temp = this.head

        while (temp) {
            output += temp.data + ','
        }

        return output.slice(0, -1)
    }

    getIterator() {
        let temp = this.head

        return {
            next: () => {
                if (temp) {
                    let value = temp.data
                    temp = temp.next
                    return {value, done: false}
                } else {
                    return {done: true}
                }
            }
        }
    }

    [Symbol.iterator]() {
        return this.getIterator();
    }

    filter(callback) {
        const result = new LList()
        let temp = this.head

        while (temp) {
            if (callback(temp.data)) {
                result.add(temp.data)
            }

            temp = temp.next
        }

        return result
    }
}

module.exports = {
    LList
}
