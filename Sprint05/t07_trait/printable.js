module.exports = {
    print() {
        for (const key in this) {
            if (this.hasOwnProperty(key)) {
                console.log(this[key].join('\n'))
            }
        }
    }
}
