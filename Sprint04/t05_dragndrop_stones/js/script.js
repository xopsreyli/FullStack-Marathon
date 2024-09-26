let newX = 0, newY = 0, startX = 0, startY = 0
const stones = document.querySelectorAll('.stone')
let currentStone = null

const mouseDown = (e) => {
    currentStone = e.target
    startX = e.clientX
    startY = e.clientY

    document.addEventListener('mousemove', mouseMove)
    document.addEventListener('mouseup', mouseUp)
}

const mouseMove = (e) => {
    if (currentStone) {
        newX = startX - e.clientX
        newY = startY - e.clientY

        startX = e.clientX
        startY = e.clientY

        currentStone.style.top = (currentStone.offsetTop - newY) + 'px'
        currentStone.style.left = (currentStone.offsetLeft - newX) + 'px'
    }
}

const mouseUp = (e) => {
    document.removeEventListener('mousemove', mouseMove)
    currentStone = null
}

const onStoneClick = (e) => {
    if (!e.target.classList.contains('active')) {
        e.target.classList.add('active')
        e.target.addEventListener('mousedown', mouseDown)
    } else {
        e.target.classList.remove('active')
        e.target.removeEventListener('mousedown', mouseDown)
    }
}

stones.forEach(stone => {
    stone.addEventListener('click', onStoneClick)
})
