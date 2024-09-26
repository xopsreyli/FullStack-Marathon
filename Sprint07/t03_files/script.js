const createForm = document.getElementById('create-file')
const filesBox = document.getElementById('files')
const deleteFileForm = document.getElementById('deleteFile')

createForm.addEventListener('submit', e => {
    e.preventDefault()

    fetch('/file', {
        method: 'POST',
        body: JSON.stringify({
            filename: e.target[0].value,
            content: e.target[1].value
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

const getFiles = () => {
    fetch('/files')
        .then(response => response.json())
        .then(data => {
            filesBox.innerHTML += data.files
            addEventsForLinks()
        })
}

const addEventsForLinks = () => {
    const files = document.getElementsByTagName('a')
    let filesArray = [...files]

    filesArray.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault()

            fetch(link.href)
                .then(response => response.json())
                .then(data => {
                    document.getElementById('selected').style.display = 'block'
                    document.getElementById('file-name').textContent = data.filename
                    document.getElementById('file-content').textContent = data.content
                })

        })
    })
}

deleteFileForm.addEventListener('submit', e => {
    e.preventDefault()

    fetch(`/file?file=${document.getElementById('file-name').textContent}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.status === 200) {
                window.location.reload()
            }
        })
})

getFiles()
