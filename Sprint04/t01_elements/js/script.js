const correctErrors = (li) => {
    if (
        !li.hasAttribute('class') ||
        li.getAttribute('class') !== 'good' &&
        li.getAttribute('class') !== 'evil' &&
        li.getAttribute('class') !== 'unknown'
    ) {
        li.setAttribute('class', 'unknown')
    }

    if (!li.hasAttribute('data-element')) {
        li.setAttribute('data-element', 'none')
    }
}

const appendCircles = (li) => {
    const dataElements = li.getAttribute('data-element').split(' ')
    const circles = document.createElement('div')

    dataElements.forEach(el => {
        const circle = document.createElement('div')
        circle.setAttribute('class', `elem ${el}`)

        if (el === 'none') {
            const line = document.createElement('div')
            line.setAttribute('class', 'line')

            circle.appendChild(line)
        }

        circles.appendChild(circle)
    })

    li.appendChild(circles)
}

const processLi = () => {
    const lis = document.getElementsByTagName('li')

    for (const li of lis) {
        correctErrors(li)
        appendCircles(li)
    }
}

processLi()
