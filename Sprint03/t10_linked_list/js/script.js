class Node {
    constructor(data) {
        this.data = data
        this.next = null
    }
}

class LinkedList {
    constructor() {
        this.head = null
        this.length = 0
    }

    add(value) {
        const node = new Node(value)

        if (!this.head) {
            this.head = node
        } else {
            let temp = this.head
            while (temp.next) {
                temp = temp.next
            }
            temp.next = node
        }

        this.length++
    }

    remove(value) {
        if (!this.head) {
            return;
        }

        if (this.head.data === value) {
            this.head = this.head.next;
        } else {
            let temp = this.head;
            while (temp.next) {
                if (temp.next.data === value) {
                    temp.next = temp.next.next;
                    this.length--;
                }
                temp = temp.next;
            }
        }

        this.length--;
    }

    contains(value) {
        let temp = this.head
        while (temp) {
            if (temp.data === value) {
                return true
            }
            temp = temp.next
        }

        return false
    }

    [Symbol.iterator]() {
        let current = this.head

        return {
            next: () => {
                if (!current) {
                    return { done: true }
                }
                const value = current.data
                current = current.next

                return { value, done: false }
            }
        }
    }

    clear() {
        this.head = null
        this.length = 0
    }

    count() {
        return this.length
    }

    log() {
        let temp = this.head
        let result = ''
        while (temp) {
            result += temp.data + ', '
            temp = temp.next
        }

        console.log(result.slice(0, -2))
    }
}

const createLinkedList = (arr) => {
    const list = new LinkedList()
    arr.forEach(el => list.add(el))

    return list
}
