const form = document.getElementById('candidate-form')
const postValuesFields = document.querySelectorAll('.req-value')

form.addEventListener('submit', e => {
    e.preventDefault()
    const name = e.target[0].value
    const email = e.target[1].value
    const age = e.target[2].value
    const about = e.target[3].value
    const photo = e.target[4].value

    postValuesFields[0].textContent += name
    postValuesFields[1].textContent += email
    postValuesFields[2].textContent += age
    postValuesFields[3].textContent += about
    postValuesFields[4].textContent += photo

    fetch('/', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: name,
            email: email,
            age: age,
            about: about,
            photo: photo,
        })
    })
})
