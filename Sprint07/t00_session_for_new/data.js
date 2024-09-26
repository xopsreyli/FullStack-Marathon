const form = document.getElementById('forget-form')

document.addEventListener('DOMContentLoaded', () => {
    fetch('/hero')
        .then(response => response.json())
        .then(hero => showHeroData(hero))
})

const showHeroData = (hero) => {
    document.getElementById('name').textContent = `name: ${hero.name}`
    document.getElementById('alias').textContent = `alias: ${hero.alias}`
    document.getElementById('age').textContent = `age: ${hero.age}`
    document.getElementById('description').textContent = `description: ${hero.about} via the ${hero.powers.join(', ').slice(0, -2)} powers`
    document.getElementById('photo').textContent = `photo: ${hero.photo}`
    document.getElementById('level-of-control').textContent = `level of control: ${hero['level-of-control']}`
    document.getElementById('publicity').textContent = `publicity: ${hero.publicity}`
}

form.addEventListener('submit', () => {
    fetch('/remove-hero')
        .then(response => {
            if (response.status === 200) {
                window.location.reload()
            }
        })
})
