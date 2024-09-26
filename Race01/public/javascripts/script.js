const socket = io({
    auth: {
        token: localStorage.getItem('accessToken')
    }
})

const searchBtn = document.getElementById('searchGameBtn')
const animationBox = document.getElementById('searchAnimationBox')
const stopSearchBtn = document.getElementById('stopSearchBtn')

document.addEventListener('DOMContentLoaded', e => {
    searchBtn.style.display = localStorage.getItem('login') ? 'block' : 'none'
})

socket.on('connect_error', (err) => {
    if (err.message === 'Authentication error: Invalid token') {
        fetch('http://localhost:3000/api/auth/token/update', {
            method: 'POST',
            body: JSON.stringify({ token: localStorage.getItem('refreshToken')}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                localStorage.setItem('accessToken', data.accessToken)
                socket.auth.token = data.token

                socket.disconnect()
                socket.connect()
            })
    }
})

searchBtn.addEventListener('click', e => {
    e.preventDefault()

    searchBtn.style.display = 'none'
    animationBox.style.display = 'flex'

    socket.emit('findOpponent')
})

stopSearchBtn.addEventListener('click', e => {
    e.preventDefault()

    searchBtn.style.display = 'block'
    animationBox.style.display = 'none'

    socket.emit('stopSearching')
})

socket.on('gameReady', data => {
    window.location.href = `arena?room=${data.room}`
})
