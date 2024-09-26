const form = document.getElementById('registrationForm')
const error = document.getElementById('formError')

form.addEventListener('submit', e => {
    e.preventDefault()
    error.textContent = null

    const formData = new FormData(form)

    if (formData.get('password') !== formData.get('repeatPassword')) {
        return error.textContent = 'Passwords don\'t match! Please try again.'
    }

    fetch('http://localhost:3000/api/auth/registration', {
        method: 'POST',
        body: JSON.stringify({
            login: formData.get('login'),
            password: formData.get('password')
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => {
            if (data.status !== 200) {
                return error.textContent = data.message
            }

            localStorage.setItem('login', data.user.login)
            localStorage.setItem('avatar', data.user.avatar)
            localStorage.setItem('accessToken', data.user.accessToken)
            localStorage.setItem('refreshToken', data.user.refreshToken)

            window.location.href = '/'
        })
})
