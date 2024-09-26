const menu = document.querySelector('.menu')
const movies = [
    {
        title: 'Harry Potter and the Sorcerer\'s Stone',
        date: 'November 16, 2001',
        cast: [
            'Daniel Radcliffe',
            'Emma Watson',
            'Rupert Grint',
            'Robbie Coltrane',
            'Alan Rickman',
        ],
        description: 'An orphaned boy enrolls in a school of wizardry, where he learns the truth about himself, his family and the terrible evil that haunts the magical world.',
        img: 'harry-potter.jpg',
    },
    {
        title: 'Avengers: Endgame',
        date: 'April 22, 2019',
        cast: [
            'Robert Downey Jr.',
            'Chris Evans',
            'Ian McShane',
            'Chris Hemsworth',
            'Scarlett Johansson',
        ],
        description: 'After the devastating events of Avengers: Infinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos\' actions and restore balance to the universe.',
        img: 'avengers-endgame.jpg',
    },
    {
        title: 'The Lord of the Rings: The Fellowship of the Ring',
        date: 'December 19, 2001',
        cast: [
            'Elijah Wood',
            'Viggo Mortensen',
            'Murray McKellen',
            'Orlando Bloom',
            'Sean Astin',
        ],
        description: 'A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.',
        img: 'lord-of-the-ring.jpg',
    },
]

const fillMenu = () => {
    movies.forEach((movie, id) => {
        const box = document.createElement('div')
        box.classList.add('menu-item')
        box.addEventListener('click', () => {
            addActiveStyles(id)
            showMovie(id)
        })

        const text = document.createElement('span')
        text.classList.add('menu-item-text')
        text.textContent = movie.title

        box.appendChild(text)
        menu.appendChild(box)
    })
}

const addActiveStyles = id => {
    const items = document.querySelectorAll('.menu-item')
    items.forEach(item => item.classList.remove('menu-item-active'))
    items[id].classList.add('menu-item-active')
}

const showMovie = id => {
    document.querySelector('.movie-title').textContent = movies[id].title
    document.querySelector('.date').textContent = movies[id].date

    const cast = document.querySelector('.cast')
    cast.innerHTML = ''
    movies[id].cast.forEach(actor => {
        const card = document.createElement('div')
        card.classList.add('cast-card')

        const text = document.createElement('span')
        text.innerHTML = actor.split(' ').join('<br>')
        text.classList.add('cast-card-text')

        card.appendChild(text)
        cast.appendChild(card)
    })
    document.querySelector('.movie-desc').textContent = movies[id].description

    const imgBox = document.querySelector('.img-box')
    imgBox.innerHTML = ''

    const img = document.createElement('img')
    img.classList.add('img')
    img.src = `./assets/images/${movies[id].img}`
    imgBox.appendChild(img)
}

fillMenu()
