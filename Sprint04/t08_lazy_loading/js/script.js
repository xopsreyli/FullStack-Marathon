const images = document.getElementsByTagName('img')
const counterBox = document.querySelector('.counter')
let loaded = 0

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('loaded')) {
            const img = entry.target
            img.src = img.dataset.src
            img.onload = () => {
                img.classList.add('loaded')
                loaded++
                counterBox.textContent = `${loaded} images loaded from from 20`
                if (loaded === images.length) {
                    counterBox.style.backgroundColor = 'green'
                    setTimeout(() => {
                        counterBox.style.display = 'none'
                    }, 3000)
                }
            }
        }
    })
})

Array.from(images).forEach(img => {
    observer.observe(img)
})
