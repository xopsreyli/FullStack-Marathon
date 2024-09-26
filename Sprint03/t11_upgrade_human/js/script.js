const propertyValueBoxs = document.querySelectorAll('.property-value')
const messageField = document.querySelector('.message-text')
const animImgBox = document.querySelector('.anim-img')
const methodsBox = document.querySelector('.methods')
const imgBox = document.querySelector('.img-box')

const showMessage = (text) => {
    messageField.innerHTML = text
}

const loadImg = (type) => {
    imgBox.innerHTML = type === 'human' ?
        '<img class="img" src="./assets/images/human.jpg" alt="human"/>'
        : '<img class="img" src="./assets/images/superhero.png" alt="superhero"/>'
}

const showProperties = (human) => {
    propertyValueBoxs[0].innerHTML = human.firstName
    propertyValueBoxs[1].innerHTML = human.lastName
    propertyValueBoxs[2].innerHTML = human.gender
    propertyValueBoxs[3].innerHTML = human.age
    propertyValueBoxs[4].innerHTML = human.calories
}

const showMethods = (type) => {
    if (type === 'human') {
        methodsBox.innerHTML = '<button class="method" onclick="human.sleepFor()">Sleep</button>\n' +
            '                <button class="method" onclick="human.feed()">Feed</button>\n' +
            '                <button class="method" onclick="turnIntoSuperhero()">Turn into superhero</button>'
    } else {
        methodsBox.innerHTML = '<button class="method" onclick="human.sleepFor()">Sleep</button>\n' +
            '<button class="method" onclick="human.feed()">Feed</button>\n' +
            '<button class="method" onclick="human.fly()">Fly</button>\n' +
            '<button class="method" onclick="human.fightWithEvil()">Fight with EVIL</button>\n' +
            '<button class="method" onclick="human.shootWeb()">Shoot web</button>\n'
    }
}

class Human {
    constructor(firstName, lastName, gender, age, calories = 0) {
        this.firstName = firstName
        this.lastName = lastName
        this.gender = gender
        this.age = age
        this.calories = calories
    }

    sleepFor() {
        const timeToSleep = Number.parseInt(prompt('Enter time to sleep in seconds:'))

        if (isNaN(timeToSleep)) {
            return messageField.innerHTML = "<span class='message-error'>Invalid input! Please enter a number</span>"
        }

        animImgBox.innerHTML = `<img class="sleeping-img" src="./assets/images/sleeping.jpeg" style="animation: disappearance ${timeToSleep}s linear" alt="sleeping">`
        showMessage('I\m sleeping')
        setTimeout(() => {
            animImgBox.innerHTML = ''
            showMessage('I\'m awake now')
        }, timeToSleep * 1000)
    }

    feed() {
        if (this.calories > 500) {
            return showMessage('I\'m not hungry')
        }

        animImgBox.innerHTML = `<img class="pizza-img" src="./assets/images/pizza.png" style="animation: disappearance 10s linear" alt="pizza">`
        showMessage('Nom nom nom')
        setTimeout(() => {
            this.calories += 200
            showProperties(this)
            animImgBox.innerHTML = ''
            if (this.calories < 500) {
                return showMessage('I\'m still hungry')
            }

            return showMessage('')
        }, 10000)

    }
}

class Superhero extends Human {
    constructor(firstName, lastName, gender, age, calories) {
        super(firstName, lastName, gender, age, calories)
    }

    fly() {
        const flyImg = document.createElement('img')
        flyImg.classList.add('fly-img')
        flyImg.src = './assets/images/fly.png'
        document.body.appendChild(flyImg)
        showMessage('I\'m flying!')

        setTimeout(() => {
            document.body.removeChild(flyImg)
            showMessage('')
        }, 10000)
    }

    fightWithEvil() {
        showMessage('Khhhh-chh... Bang-g-g-g... Evil is defeated!')
    }

    shootWeb() {
        showMessage('Shooting Web!')
        const webTimer = setInterval(() => {
            const webImg = document.createElement('img')
            webImg.classList.add('web-img')
            webImg.src = './assets/images/web.png'
            webImg.style.left = Math.floor(Math.random() * (window.innerWidth + 1)) + 'px'
            webImg.style.top = Math.floor(Math.random() * (window.innerHeight + 1) - 200) + 'px'

            document.body.appendChild(webImg)
        }, 200)

        setTimeout(() => {
            clearInterval(webTimer)
            const webs = document.querySelectorAll('.web-img')
            webs.forEach(web => {
                web.parentNode.removeChild(web)
            })
            showMessage('')
        }, 10000)
    }
}

let human = new Human('Slavik', 'Petrovich', 'Man', 18)
loadImg('human')
showProperties(human)
showMethods('human')
setTimeout(() => showMessage('I\'m hungry!!!'), 5000)
const caloriesTimer = setInterval(() => {
    if (human.calories > 0) {
        human.calories <= 200 ? human.calories = 0 : human.calories -= 200
        showProperties(human)
    }
}, 60000)

const turnIntoSuperhero = () => {
    if (human.calories < 500) {
        return showMessage('500 calories needed')
    }

    human = new Superhero('Peter', 'Parker', 'Man', 18, human.calories)
    loadImg('superhero')
    showProperties(human)
    showMethods('superhero')
}
