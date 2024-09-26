const calculateTime = () => {
    const firstJan1939 = new Date(1939, 0, 1)
    const now = new Date()

    const differenceInMilliseconds = now - firstJan1939

    const millisecondsPerDay = 1000 * 60 * 60 * 24
    const millisecondsPerMonth = millisecondsPerDay * 30.436875
    const millisecondsPerYear = millisecondsPerDay * 365.25

    const years = Math.floor(differenceInMilliseconds / millisecondsPerYear)
    const months = Math.floor((differenceInMilliseconds % millisecondsPerYear) / millisecondsPerMonth)
    const days = Math.floor(((differenceInMilliseconds % millisecondsPerYear) % millisecondsPerMonth) / millisecondsPerDay)

    return {
        years: () => years,
        months: () => months,
        days: () => days
    }
}

module.exports = {
    calculateTime
}
