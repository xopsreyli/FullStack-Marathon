import { fetchData } from "./makeAuthRequest.js"

const registrationLink = document.getElementById('registrationLink')
const loginLink = document.getElementById('loginLink')
const logoutLink = document.getElementById('logoutLink')
const profileLink = document.getElementById('profileLink')
const userLogin = document.getElementById('userLogin')
const userAvatar = document.getElementById('userAvatar')

document.addEventListener('DOMContentLoaded', () => {
    profileLink.style.display = localStorage.getItem('login') ? 'flex' : 'none'
    logoutLink.style.display = localStorage.getItem('login') ? 'block' : 'none'
    registrationLink.style.display = localStorage.getItem('login') ? 'none' : 'block'
    loginLink.style.display = localStorage.getItem('login') ? 'none' : 'block'

    userLogin.textContent = localStorage.getItem('login') ? localStorage.getItem('login') : null
    userAvatar.src = localStorage.getItem('login') ? './images/avatars/' + localStorage.getItem('avatar') : ''
})

logoutLink.addEventListener('click', e => {
    e.preventDefault()

    const confirmResult = confirm('Do you really want to log out?')

    if (confirmResult) {
        fetchData('http://localhost:3000/api/auth/logout', 'DELETE')
            .then(res => {
                localStorage.removeItem('login')
                localStorage.removeItem('avatar')
                localStorage.removeItem('accessToken')
                localStorage.removeItem('refreshToken')

                window.location.href = '/'
            })
    }
})
