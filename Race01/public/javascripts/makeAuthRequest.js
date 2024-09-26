export const fetchData = (url, method = 'GET') => {
    return fetch(url, {
        method: method,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
        .then(res => {
            if (res.status !== 200) {
                fetch('http://localhost:3000/api/auth/token/update', {
                    method: 'POST',
                    body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        localStorage.setItem('accessToken', data.accessToken)

                        return fetchData(url)
                    })
            }

            return res
        })
}
