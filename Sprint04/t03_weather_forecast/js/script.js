const APIKEY = 'cbd586e1ee233a26940eead2a47a8336'
const cards = document.querySelector('.cards')

const getWeather = async (city) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKEY}&units=metric`)
        .then(response => response.json())
        .then(data => showCard(getTemperatures(data.list)))
}

const getTemperatures = (weatherList) => {
    console.log(weatherList)
    const dailyTemp = {}

    weatherList.forEach(weather => {
        const date = weather.dt_txt.split(' ')[0]
        const temp = Math.round(weather.main.temp)
        const iconId = weather.weather[0].icon

        if (!dailyTemp[date] || temp > dailyTemp[date][0]) {
            dailyTemp[date] = [temp, iconId]
        }
    })

    return dailyTemp
}

const showCard = (dailyTemp) => {
    for (let dayTemp in dailyTemp) {
        const card = document.createElement('div')
        card.classList.add('card')

        const dateBox = document.createElement('div')
        dateBox.classList.add('date-box')
        const date = document.createElement('span')
        date.classList.add('date')
        date.textContent = resolveDate(dayTemp)
        dateBox.appendChild(date)
        const imgBox = document.createElement('div')
        imgBox.classList.add('img-box')
        const img = document.createElement('img')
        img.src = `https://openweathermap.org/img/wn/${dailyTemp[dayTemp][1]}.png`
        imgBox.appendChild(img)
        const tempBox = document.createElement('div')
        tempBox.classList.add('temp-box')
        const temp = document.createElement('span')
        temp.classList.add('temp')
        temp.textContent = resolveTemp(dailyTemp[dayTemp][0])
        tempBox.appendChild(temp)

        card.appendChild(dateBox)
        card.appendChild(imgBox)
        card.appendChild(tempBox)

        cards.appendChild(card)
    }
}

const resolveDate = (date) => {
    const dateInArr = date.split('-')

    return `${dateInArr[2]}.${dateInArr[1]}`
}

const resolveTemp = (temp) => {
    let sign = ''

    if (temp > 0) {
        sign = '+'
    } else if (temp < 0) {
        sign = '-'
    }

    return sign + temp + '°'
}

getWeather('Kharkiv')
