// Regex to match only letters
const regex = /^[a-zA-Z]+$/;

const capitalize = (str) => {
    if (str.charAt(0) !== str.charAt(0).toUpperCase()) {
        str = str.charAt(0).toUpperCase() + str.slice(1)
    }

    return str
}

const displayOutput = (output) => {
    alert(output)
    console.log(output)
}

const main = () => {
    const name = prompt('Enter your first name: ')
    const lastName = prompt('Enter your last name: ')

    if (!regex.test(name) || !regex.test(lastName)) {
        return displayOutput('Wrong input!')
    }

    displayOutput(capitalize(name), capitalize(lastName))
}

main()
