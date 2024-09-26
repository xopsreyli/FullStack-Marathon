const API_KEY = 'b2ede6fa3b3cf2e8af486efb52526cfb'
const PRIVATE_KEY = '6f47e1ae7460b1fb6b8f80f3e1d3a23e05237ce0'
const content = document.getElementById('content')

const ts = new Date().getTime()
const hash = CryptoJS.MD5(ts + PRIVATE_KEY + API_KEY).toString()

fetch(`https://gateway.marvel.com/v1/public/series?apikey=${API_KEY}&ts=${ts}&hash=${hash}`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        show(data, content)
    })

const show = (obj, box) => {
    for (const key in obj) {
        if (typeof obj[key] === 'object') {
            const id = box.id + '-' + key

            box.innerHTML += `
                <div class="obj-box" id="${id}">
                    <span class="obj-key">${key}:</span>
                </div>
            `
            show(obj[key], document.getElementById(id))
        } else {
            box.innerHTML += `
                <div class="box">
                    <span class="key">${key}:</span>
                    <span class="value">${obj[key]}</span>
                </div>
            `
        }
    }
}
