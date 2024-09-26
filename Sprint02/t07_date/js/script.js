const formatNum = (num) => {
    return num < 10 ? `0${num}` : num
}

const DAYS = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
]

const getFormattedDate = (dateObject) => {
    const date = formatNum(dateObject.getDate())
    const month = formatNum(dateObject.getMonth() + 1)
    const year = dateObject.getFullYear()
    const hours = formatNum(dateObject.getHours())
    const minutes = formatNum(dateObject.getMinutes())
    const day = DAYS[dateObject.getDay()]

    return `${date}.${month}.${year} ${hours}:${minutes} ${day}`
}
