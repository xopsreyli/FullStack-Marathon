const status = document.getElementById('status')
const isHackedText = document.getElementById('is-hacked')
const passwordForm = document.getElementById('password-form')
const guessForm = document.getElementById('guess-form')
const hash = document.getElementById('hash')

const loadPage = () => {
    fetch('/password')
        .then(response => response.json())
        .then(data => {
            if (data.password) {
                loadCheckElements(data.password)
            } else {
                loadPasswordForm(false)
            }
        })
}

const loadCheckElements = (hashPassword) => {
    status.textContent = 'Password saved at session.'
    hash.textContent += hashPassword
    passwordForm.style.display = 'none'
    guessForm.style.display = 'block'
}

const loadPasswordForm = (isHacked) => {
    if (isHacked) {
        isHackedText.style.display = 'block'
        isHackedText.textContent = 'Hacked!'
        isHackedText.classList.remove('not-hacked')
        isHackedText.classList.add('hacked')
    }
    status.textContent = 'Password not saved at session.'
    passwordForm.style.display = 'block'
    guessForm.style.display = 'none'
    passwordForm.reset()
}

passwordForm.addEventListener('submit', e => {
    e.preventDefault()
    const formData = new FormData(passwordForm)
    let formDataObj = {}

    formData.forEach((value, key) => {
        formDataObj[key] = value
    })

    fetch('/add', {
        method: 'POST',
        body: JSON.stringify(formDataObj),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            loadCheckElements(data.password)
        })
})

guessForm.addEventListener('submit', e => {
    e.preventDefault()

    fetch('check', {
        method: 'POST',
        body: JSON.stringify({
            password: e.target[0].value
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (response.status === 200) {
                loadPasswordForm(true)
            } else {
                isHackedText.style.display = 'block'
                isHackedText.textContent = 'Access denied!'
                isHackedText.classList.remove('hacked')
                isHackedText.classList.add('not-hacked')
            }
        })
})

loadPage()
