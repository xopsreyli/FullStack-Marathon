import {fetchData} from "./makeAuthRequest.js"

const form = document.getElementById('avatarForm');
const login = document.getElementById('profileLogin');
const headerAvatar = document.getElementById('userAvatar');
const avatar = document.getElementById('profileAvatar');

fetchData('http://localhost:3000/api/user/')
    .then(res => res.json())
    .then(data => {
        avatar.src = './images/avatars/' + data.user.avatar
        login.textContent = data.user.login
    })

form.addEventListener('change', e => {
    e.preventDefault();
    const formData = new FormData(form)
    fetch('http://localhost:3000/api/user/change-avatar', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: formData
    })
        .then(res => res.json())
        .then(data => {
            if (data.status === 200) {
                avatar.src = './images/avatars/' + data.avatar
                headerAvatar.src = './images/avatars/' + data.avatar
                localStorage.setItem('avatar', data.avatar)
            }
        })
});
