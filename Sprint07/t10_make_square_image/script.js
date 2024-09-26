const form = document.getElementById('img-form')
const imagesContainer = document.getElementById('images-container')

form.addEventListener('submit', e => {
    e.preventDefault()
    imagesContainer.innerHTML = ''; // Clear previous images

    const imgUrl = document.getElementById('imgUrl').value
    createSquareImages(imgUrl)
})

const createSquareImages = url => {
    const img = new Image()
    img.crossOrigin = 'Anonymous'
    img.src = url

    img.onload = () => {
        const size = Math.min(img.width, img.height)
        const canvas = document.createElement('canvas')
        canvas.width = size
        canvas.height = size
        const ctx = canvas.getContext('2d')

        ctx.drawImage(img, (img.width - size) / 2, (img.height - size) / 2, size, size, 0, 0, size, size)

        const imageData = ctx.getImageData(0, 0, size, size)

        imagesContainer.appendChild(canvas) // Append the original square image first

        const channels = ['R', 'G', 'B']
        channels.forEach((channel, index) => {
            const channelCanvas = document.createElement('canvas')
            channelCanvas.width = size
            channelCanvas.height = size
            const channelCtx = channelCanvas.getContext('2d')
            const channelData = channelCtx.createImageData(size, size)

            for (let i = 0; i < imageData.data.length; i += 4) {
                channelData.data[i] = (index === 0) ? imageData.data[i] : 0
                channelData.data[i + 1] = (index === 1) ? imageData.data[i + 1] : 0
                channelData.data[i + 2] = (index === 2) ? imageData.data[i + 2] : 0
                channelData.data[i + 3] = imageData.data[i + 3]
            }

            channelCtx.putImageData(channelData, 0, 0)
            imagesContainer.appendChild(channelCanvas)
        })
    }

    img.onerror = function() {
        alert('Failed to load image. Please check the URL.')
    }
}
