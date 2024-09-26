const sliderTrack = document.querySelector('.slider-track')
const sliderImgs = document.querySelectorAll('.slider-img')
let translateValue = 0

const slideInterval = setInterval(() => {
    if (translateValue === (sliderImgs.length - 1) * -100) {
        translateValue = 100
    }
    sliderTrack.style.transform = `translateX(${translateValue -= 100}%)`
}, 3000)

const next = () => {
    clearInterval(slideInterval)
    if (translateValue === (sliderImgs.length - 1) * -100) {
        return
    }

    sliderTrack.style.transform = `translateX(${translateValue -= 100}%)`
}

const prev = () => {
    clearInterval(slideInterval)
    if (translateValue === 0) {
        return
    }

    sliderTrack.style.transform = `translateX(${translateValue += 100}%)`
}
