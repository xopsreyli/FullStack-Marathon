const noteForm = document.getElementById('note-form')
const notesBox = document.getElementById('notes-box')

noteForm.addEventListener('submit', e => {
    e.preventDefault()
    
    fetch('/note', {
        method: 'POST',
        body: JSON.stringify({
            name: document.getElementById('name').value,
            importance: document.getElementById('importance').value,
            content: document.getElementById('content').value
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (response.status === 200) {
                window.location.reload()
            }
        })
})

const getNotes = () => {
    fetch('/notes')
        .then(response => response.json())
        .then(notes => {
            let html = ''
            
            notes.forEach(note => {
                html += `<li><a class="note" href="/note?name=${note.name}">${note.date} > ${note.name}</a> <a class="delete" href="/note?name=${note.name}">DELETE</a></li>`
            })

            notesBox.innerHTML = html
            addGetNoteListeners()
            addDeleteNoteListeners()
        })
}

const addGetNoteListeners = () => {
    const notes = document.querySelectorAll('.note')

    notes.forEach(note => {
        note.addEventListener('click', e => {
            e.preventDefault()

            fetch(note.href)
                .then(response => response.json())
                .then(note => {
                    console.log(note)
                    showNote(note)})
        })
    })
}

const addDeleteNoteListeners = () => {
    const deleteButtons = document.querySelectorAll('.delete')

    deleteButtons.forEach(deleteBtn => {
        deleteBtn.addEventListener('click', e => {
            e.preventDefault()

            fetch(deleteBtn.href, {
                method: 'DELETE'
            })
                .then(response => {
                    if (response.status === 200) {
                        window.location.reload()
                    }
                })
        })
    })
}

const showNote = (note) => {
    document.getElementById('details').textContent = 'Details of ' + note.name
    document.getElementById('details-box').style.display = 'block'
    document.getElementById('note-date').textContent = 'date: ' + note.date
    document.getElementById('note-name').textContent = 'name: ' + note.name
    document.getElementById('note-importance').textContent = 'importance: ' + note.importance
    document.getElementById('note-content').textContent = 'text: ' + note.content
}

getNotes()
