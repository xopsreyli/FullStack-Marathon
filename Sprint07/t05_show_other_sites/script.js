const form = document.getElementById('form')

form.addEventListener('submit', e => {
    e.preventDefault()

    fetch(`${document.getElementById('url').value}`)
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser()
            const doc = parser.parseFromString(html, 'text/html')
            document.getElementById('code').textContent = `<body>${doc.body.innerHTML}</body>`
        })
})
