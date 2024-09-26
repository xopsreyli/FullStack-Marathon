// Regular expressions to check the values
const animalRegex = /^[a-zA-Z]{1,20}$/
const genderRegex = /^(male|female|)$/
const ageRegex = /^[1-9]\d{0,4}$/

const main = () => {
    const animal = prompt('What animal is the superhero most similar to?')

    if (!animalRegex.test(animal)) {
        alert('Error! Input is not valid.')
        return
    }

    const gender = prompt('Is the superhero male or female? Leave blank if unknown or other.')

    if (!genderRegex.test(gender)) {
        alert('Error! Input is not valid.')
        return
    }

    const age = prompt('How old is the superhero?')

    if (!ageRegex.test(age)) {
        alert('Error! Input is not valid.')
        return
    }

    alert(`The superhero name is: ${animal}-${generateDescription(gender, age)}`)
}

const generateDescription = (gender, age) => {
    if (gender === 'male' && age < 18) {
        return 'boy'
    } else if (gender === 'male' && age >= 18) {
        return 'man'
    } else if (gender === 'female' && age < 18) {
        return 'girl'
    } else if (gender === 'female' && age >= 18) {
        return 'woman'
    } else if (!gender && age < 18) {
        return 'kid'
    }

    return 'hero'
}

main()
