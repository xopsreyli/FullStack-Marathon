const textarea = document.getElementById('text')
const archive = document.querySelector('.archive')

const addNote = () => {
    if (textarea.value.length === 0) {
        return alert('It\'s empty. Try to input something in "Text input"')
    }

    const date = new Date()

    const year = date.getFullYear().toString().slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);

    const length = localStorage.length
    localStorage.setItem(`note_${length}`, `${textarea.value} [${year}.${month}.${day}, ${hours}:${minutes}:${seconds}]`)
    textarea.value = ''

    showNotes()
}

const showNotes = () => {
    if (localStorage.length === 0) {
        return archive.innerHTML = '<span>[Empty]</span>'
    }

    archive.innerHTML = ''
    for (let i = 0; i < localStorage.length; i++) {
        const span = document.createElement('span')
        span.textContent = `--> ${localStorage.getItem(`note_${i}`)}`
        archive.appendChild(span)
    }
}

const clearNotes = () => {
    const isClear = confirm('Are you sure?')

    if (isClear) {
        localStorage.clear()

        showNotes()
    }
}

showNotes()
