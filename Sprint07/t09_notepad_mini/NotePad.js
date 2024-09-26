const fs = require('fs')
const Note = require('./Note')

module.exports = class NotePad {
    createNote(data) {
        if (!fs.existsSync('./notes.json')) {
            fs.writeFileSync('./notes.json', '')
        }

        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        const note = new Note(
            data.name,
            data.importance,
            data.content,
            `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
        )

        const notes = this.getNotes()
        notes.push(note)

        const notesJson = JSON.stringify(notes)

        fs.writeFileSync('./notes.json', notesJson, 'utf8')
    }

    getNote(name) {
        const notes = this.getNotes();
        return notes.find(note => note.name === name) || {};
    }

    deleteNote(name) {
        let notes = this.getNotes()
        notes = notes.filter(note => note.name !== name)

        fs.writeFileSync('./notes.json', JSON.stringify(notes), 'utf8')
    }

    getNotes() {
        if (fs.existsSync('./notes.json')) {
            try {
                const notesData = JSON.parse(fs.readFileSync('notes.json', 'utf8'))
                return notesData.map(noteData => new Note(noteData.name, noteData.importance, noteData.content, noteData.date))
            } catch (e) {
                return []
            }
        }

        return []
    }
}
