let validator = {
    get: function (obj, prop) {
        console.log(`Trying to access the property '${prop}'...`)

        return prop in obj ? obj[prop] : false
    },
    set: function (obj, prop, value) {
        console.log(`Setting value '${value}' to '${prop}'`)

        if (prop === 'age') {
            if (!Number.isInteger(value)) {
                throw new TypeError("The age is not an integer")
            }
            if (value < 0 || value > 200) {
                throw new RangeError("The age is invalid")
            }
        }

        obj[prop] = value

        return true
    },
}
