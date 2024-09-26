const textarea = document.getElementById('text')
const archive = document.querySelector('.archive')

const addNote = () => {
    if (textarea.value.length === 0) {
        return alert('It\'s empty. Try to input something in "Text input"')
    }

    const length = document.cookie.split(';').length
    document.cookie = `${encodeURIComponent('note_' + length)}=${encodeURIComponent(textarea.value)};max-age=${30 * 24 * 60 * 60};path=/`
    textarea.value = ''

    showNotes()
}

const showNotes = () => {
    const cookies = document.cookie.split('; ')

    if (cookies.length === 0 || cookies[0] === '') {
        return archive.innerHTML = '<span>[Empty]</span>'
    }

    archive.innerHTML = ''
    cookies.forEach(cookie => {
        const value = decodeURIComponent(cookie.split('=')[1])
        const span = document.createElement('span')
        span.textContent = `--> ${value}`
        archive.appendChild(span)
    })
}

const clearNotes = () => {
    const isClear = confirm('Are you sure?')

    if (isClear) {
        const cookies = document.cookie.split('; ')

        cookies.forEach(cookie => {
            const name = decodeURIComponent(cookie.split('=')[0])
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`
        })

        showNotes()
    }
}

showNotes()
