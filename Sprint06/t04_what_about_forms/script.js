const form = document.getElementById('form')
const answer = document.getElementById('answer')

form.addEventListener('submit', e => {
    console.log('hello')
    e.preventDefault()
    console.log(form.elements['quiz'].value)
    if (form.elements['quiz'].value) {
        if (form.elements['quiz'].value === '3') {
            answer.textContent = 'Goooood Job!'
        } else {
            answer.textContent = 'Wrong!'
        }
    } else {
        answer.textContent = 'Pick the answer!'
    }
})
