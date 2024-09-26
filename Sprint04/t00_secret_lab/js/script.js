const transformation = () => {
    const heroBox = document.getElementById('hero')
    const lab = document.getElementById('lab')

    if (heroBox.textContent === 'Bruce Banner') {
        heroBox.textContent = 'Hulk'
        heroBox.style.fontSize = '130px'
        heroBox.style.letterSpacing = '6px'
        lab.style.backgroundColor = '#70964b'
    } else {
        heroBox.textContent = 'Bruce Banner'
        heroBox.style.fontSize = '60px'
        heroBox.style.letterSpacing = '2px'
        lab.style.backgroundColor = '#ffb300'
    }
}
