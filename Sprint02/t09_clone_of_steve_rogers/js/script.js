const copyObj = (obj) => {
    let newObj = {}

    for (let key in obj) {
        if (typeof obj[key] === 'object') {
            newObj[key] = copyObj(obj[key])
        } else {
            newObj[key] = obj[key]
        }
    }

    return newObj
}
