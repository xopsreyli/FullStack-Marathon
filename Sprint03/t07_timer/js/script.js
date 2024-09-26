class Timer {
    title = ''
    delay = 0
    stopCounter = 0
    timer = null

    constructor(title, delay, stopCounter) {
        this.title = title
        this.delay = delay
        this.stopCounter = stopCounter
    }

    start() {
        this.timer = setInterval(() => this.tick(), this.delay)

        console.log(`Timer ${this.title} started (delay=${this.delay}, stopCount=${this.stopCounter})`)
    }

    tick() {
        this.stopCounter--

        console.log(`Timer ${this.title} Tick!  |  cycles left ${this.stopCounter}`)

        if (this.stopCounter === 0) {
            this.stop()
        }
    }

    stop() {
        clearInterval(this.timer)

        console.log(`Timer ${this.title} stopped`)
    }
}

const runTimer = (id, delay, counter) => {
    const timer = new Timer(id, delay, counter)
    timer.start()
}
