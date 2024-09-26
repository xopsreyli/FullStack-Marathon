const form = document.getElementById('hero-form')

form.addEventListener('submit', e => {
    e.preventDefault()
    const formData = new FormData(form)
    const formDataObj = {}

    formData.forEach((value, key) => {
        if (key === 'powers') {
            if (!formDataObj[key]) {
                formDataObj[key] = []
            }
            formDataObj[key].push(value)
        } else {
            formDataObj[key] = value
        }
    })

    fetch('/new-hero', {
        method: 'POST',
        body: JSON.stringify(formDataObj),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => {
        if (response.status === 200) {
            window.location.reload()
        }
    })
})
