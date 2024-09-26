const concat = (string1, string2) => {
    if (string1 && string2) {
        return string1 + ' ' + string2
    }

    const innerConcat = (str2) => {
        if (!str2) {
            str2 = prompt('Enter second string: ')
        }

        innerConcat.count++

       return string1 + ' ' + str2
    }

    innerConcat.count = 0;

    return innerConcat
}
