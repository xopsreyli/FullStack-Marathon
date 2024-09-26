const form = document.getElementById('form')
const output = document.getElementById('output')

form.addEventListener('submit', e => {
    e.preventDefault()

    const data = new FormData(form)
    let dataObj = {}
    data.forEach((value, key) => {
        if (key === 'types') {
            if (!dataObj[key]) {
                dataObj[key] = []
            }
            dataObj[key].push(value)
        } else {
            dataObj[key] = value
        }
    })

    console.log(dataObj)

    fetch('encode', {
        method: 'POST',
        body: JSON.stringify(dataObj),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => show(data))
})

form.addEventListener('reset', e => {
    output.style.display = 'none'
})

const show = (data) => {
    output.style.display = 'block'

    document.getElementById('input-string-box').style.display = 'block'
    document.getElementById('input-string').value = data.string

    if (data.utf8) {
        document.getElementById('utf-8-box').style.display = 'block'
        document.getElementById('utf-8').value = data.utf8
    }
    if (data.iso88591) {
        document.getElementById('iso-box').style.display = 'block'
        document.getElementById('iso').value = data.iso88591
    }
    if (data.win1252) {
        document.getElementById('win-box').style.display = 'block'
        document.getElementById('win').value = data.win1252
    }
}
