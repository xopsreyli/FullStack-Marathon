const roomName = new URLSearchParams(window.location.search).get('room')

const socket = io({
    auth: {
        token: localStorage.getItem('accessToken')
    }
})

socket.on('connect_error', (err) => {
    if (err.message === 'Authentication error: Invalid token') {
        fetch('http://localhost:3000/api/auth/token/update', {
            method: 'POST',
            body: JSON.stringify({token: localStorage.getItem('refreshToken')}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                localStorage.setItem('accessToken', data.accessToken)
                socket.auth.token = data.token

                socket.disconnect()
                socket.connect()
            })
    }
})

const timer = document.getElementById('timer')
const lineTimer = document.getElementById('lineTimer')
const mana = document.getElementById('mana')

socket.emit('joinRoom', roomName)

socket.on('gameInfo', game => {
    setGameValues(game)
    addEventOnOpponentCard(game.turn)
    fillDeck(game.cards.length)
    if (!interval) {
        startTimer()
        runLineTimerIndicator()
    }

    showPlayersCards(game.players)
    addEventsToCards(game.turn)
    showPlayersActiveCards(game.players)
    addEventsToActiveCards(game.turn)
    addEventsToOpponentActiveCards(game.turn)
    showTurn(game.turn, localStorage.getItem('login'))
})

document.getElementById('giveUp').addEventListener('click', e => {
    e.preventDefault()

    const confirmResult = confirm('Are you sure you want to give up?')

    if (confirmResult) {
        socket.emit('giveUp', roomName)
    }
})

const showTurn = (turn, playerLogin) => {
    document.getElementById('player-box-upper').style.boxShadow = turn === playerLogin ? '0 0 20px #000' : '0 0 20px #fff'
    document.getElementById('player-box-lower').style.boxShadow = turn === playerLogin ? '0 0 20px #fff' : '0 0 20px #000'
}

const fillDeck = (length) => {
    document.getElementById('deckOfCards')

    if (length > 0) {
        document.getElementById('deckOfCards').innerHTML = `
            <div class="card">
                <div class="card-invisible">
                    <div class="card-backside">
                        <svg class="card-backside-svg" xmlns="http://www.w3.org/2000/svg" version="1.1"
                             id="Layer_1" x="0px" y="0px"
                             viewBox="-215.19 -86.608 1000 402.473" enable-background="new -215.19 -86.608 1000 402.473"
                             xml:space="preserve">
                                        <g>
                                            <rect x="-215.19" y="-86.608" fill="#111" width="1000" height="402.473"/>
                                            <g>
                                                <path fill="#FFFFFF"
                                                      d="M631.063,7.184v-61.603H459.644l-28.191,205.803L403.557-54.418H341.74l6.925,54.915    c-7.14-14.068-32.449-54.915-88.146-54.915c-0.367-0.024-61.901,0-61.901,0l-0.237,299.974L153.324-54.418l-80.959-0.047    L25.753,256.349L25.777-54.42h-77.483l-27.933,174.585l-27.208-174.583h-77.508v337.906h61.036V120.618l27.764,162.866h32.449    l27.374-162.866v162.866H81.935l7.14-51.995h47.374l7.116,51.995l115.521,0.071h0.094v-0.071h0.072h0.072V173.799l14.162-2.063    l29.319,111.819h0.072h59.61h0.07l-0.024-0.071h0.106h0.072l-38.475-131.057c19.498-14.422,41.513-51.047,35.654-86.084V66.32    c0.07,0.474,36.316,217.38,36.316,217.38l71.065-0.216L515.83-22.8v306.285h115.236v-60.773h-54.7v-77.496h54.7V83.518h-54.7    V7.184H631.063z M96.265,177.905l16.758-144.461l17.4,144.461H96.265z M273.684,111.201c-4.697,2.278-9.595,3.417-14.363,3.417    V5.927c0.083,0,0.179-0.022,0.297-0.022c4.78-0.024,40.419,1.446,40.419,53.774C300.037,87.052,287.916,104.299,273.684,111.201     M754.044,222.665v60.772H641.63V-54.465h60.526v277.13H754.044z"/>
                                            </g>
                                        </g>
                                    </svg>
                    </div>
                </div>
            </div>
        `
    }
}

const showPlayersCards = (players) => {
    players.forEach(player => {
        if (player.login === localStorage.getItem('login')) {
            showMyCards(player.cards)
        } else {
            showOpponentCards(player.cards)
        }
    })
}

const showMyCards = cards => {
    const cardsBox = document.getElementById('myCards')
    cardsBox.innerHTML = ''

    cards.forEach(card => {
        cardsBox.innerHTML += `
            <div class="card visible my-card" id="${card.id}">
                <div class="card-visible">
                    <span class="card-points card-points-of-attack">${card.points_of_attack}</span>
                    <span class="card-points card-points-of-defence">${card.points_of_defence}</span>
                    <div class="card-box">
                        <img class="card-img" src="/images/cards/${card.avatar}" alt="">
                        <span class="card-alias">${card.alias}</span>
                    </div>
                    <div class="card-price-box">
                        <span class="card-price">${card.price}</span>
                    </div>
                </div>
            </div>
        `
    })
}

let pickedCard = {
    id: null,
    isActive: false
}

const addEventsToCards = turn => {
    const login = localStorage.getItem('login')

    if (turn === login) {
        document.querySelectorAll('.my-card').forEach(card => {
            card.addEventListener('click', () => {
                if (pickedCard.id !== card.id) {
                    if (pickedCard.id) {
                        document.getElementById(pickedCard.id).querySelector('.card-box').style.boxShadow = '0 0 8px lightskyblue'
                    }

                    card.querySelector('.card-box').style.boxShadow = '0 0 8px lime'
                    pickedCard.id = card.id
                    pickedCard.isActive = false

                    return
                }

                pickedCard.id = null
                pickedCard.isActive = false
                socket.emit('playCard', roomName, login, Number(card.id))
            })
        })
    }
}

const showOpponentCards = cards => {
    const cardsBox = document.getElementById('opponentCards')
    cardsBox.innerHTML = ''

    cards.forEach(card => {
       cardsBox.innerHTML += `
            <div class="card">
                <div class="card-invisible">
                    <div class="card-backside">
                        <svg class="card-backside-svg" xmlns="http://www.w3.org/2000/svg" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="-215.19 -86.608 1000 402.473" enable-background="new -215.19 -86.608 1000 402.473" xml:space="preserve">
                            <g>
                                <rect x="-215.19" y="-86.608" fill="#111" width="1000" height="402.473"/>
                                <g><path fill="#FFFFFF" d="M631.063,7.184v-61.603H459.644l-28.191,205.803L403.557-54.418H341.74l6.925,54.915    c-7.14-14.068-32.449-54.915-88.146-54.915c-0.367-0.024-61.901,0-61.901,0l-0.237,299.974L153.324-54.418l-80.959-0.047    L25.753,256.349L25.777-54.42h-77.483l-27.933,174.585l-27.208-174.583h-77.508v337.906h61.036V120.618l27.764,162.866h32.449    l27.374-162.866v162.866H81.935l7.14-51.995h47.374l7.116,51.995l115.521,0.071h0.094v-0.071h0.072h0.072V173.799l14.162-2.063    l29.319,111.819h0.072h59.61h0.07l-0.024-0.071h0.106h0.072l-38.475-131.057c19.498-14.422,41.513-51.047,35.654-86.084V66.32    c0.07,0.474,36.316,217.38,36.316,217.38l71.065-0.216L515.83-22.8v306.285h115.236v-60.773h-54.7v-77.496h54.7V83.518h-54.7    V7.184H631.063z M96.265,177.905l16.758-144.461l17.4,144.461H96.265z M273.684,111.201c-4.697,2.278-9.595,3.417-14.363,3.417    V5.927c0.083,0,0.179-0.022,0.297-0.022c4.78-0.024,40.419,1.446,40.419,53.774C300.037,87.052,287.916,104.299,273.684,111.201     M754.044,222.665v60.772H641.63V-54.465h60.526v277.13H754.044z"/></g>
                            </g>
                        </svg>
                    </div>
                </div>
            </div>
        `
    })
}

const showPlayersActiveCards = (players) => {
    players.forEach(player => {
        if (player.login === localStorage.getItem('login')) {
            showMyActiveCards(player.activeCards)
        } else {
            showOpponentActiveCards(player.activeCards)
        }
    })
}

const showMyActiveCards = cards => {
    const box = document.getElementById('playerActiveCards')
    box.innerHTML = ''

    cards.forEach(card => {
        box.innerHTML = `
            <div class="card visible active my-active-card" id="${card.id}">
                <div class="card-visible">
                    <span class="card-points card-points-of-attack">${card.points_of_attack}</span>
                    <span class="card-points card-points-of-defence">${card.points_of_defence}</span>
                    <div class="card-box">
                        <img class="card-img" src="/images/cards/${card.avatar}" alt="">
                        <span class="card-alias">${card.alias}</span>
                    </div>
                </div>
            </div>
        `
    })
}

const addEventsToActiveCards = turn => {
    const login = localStorage.getItem('login')

    if (turn === login) {
        document.querySelectorAll('.my-active-card').forEach(card => {
            card.addEventListener('click', () => {
                if (pickedCard.id !== card.id) {
                    if (pickedCard.id) {
                        document.getElementById(pickedCard.id).querySelector('.card-box').style.boxShadow = '0 0 8px lightskyblue'
                    }

                    card.querySelector('.card-box').style.boxShadow = '0 0 8px lime'
                    pickedCard.id = card.id
                    pickedCard.isActive = true
                }
            })
        })
    }
}

const showOpponentActiveCards = cards => {
    const box = document.getElementById('opponentActiveCards')
    box.innerHTML = ''

    cards.forEach(card => {
        box.innerHTML = `
            <div class="card visible active opponent-active-card" id="${card.id}">
                <div class="card-visible">
                    <span class="card-points card-points-of-attack">${card.points_of_attack}</span>
                    <span class="card-points card-points-of-defence">${card.points_of_defence}</span>
                    <div class="card-box">
                        <img class="card-img" src="/images/cards/${card.avatar}" alt="">
                        <span class="card-alias">${card.alias}</span>
                    </div>
                </div>
            </div>
        `
    })
}

const addEventsToOpponentActiveCards = turn => {
    const login = localStorage.getItem('login')

    if (turn === login) {
        document.querySelectorAll('.opponent-active-card').forEach(card => {
            card.addEventListener('click', () => {
                if (pickedCard.isActive) {
                    socket.emit('attackCard', roomName, login, Number(pickedCard.id), Number(card.id))

                    pickedCard.id = null
                    pickedCard.isActive = false
                }
            })
        })
    }
}

socket.on('gameOver', data => {
    document.getElementById('gameResultBox').style.display = 'flex'
    const gameResult = document.getElementById('gameResult')

    if (localStorage.getItem('login') === data.winner) {
        gameResult.style.color = 'lime'
        gameResult.textContent = 'Victory!'
        document.getElementById('gameResultMessage').textContent = data.winnerMessage
    } else {
        gameResult.style.color = 'crimson'
        gameResult.textContent = 'Defeat!'
        document.getElementById('gameResultMessage').textContent = 'Don\'t give up, you can win the next one!'
    }

    setTimeout(() => {
        window.location.href = '/'
    }, 5000)
})

const setGameValues = game => {
    setPlayers(game.players)
}

const setPlayers = players => {
    const playerId = localStorage.getItem('login') === players[0].login ? 0 : 1
    const opponentId = playerId ? 0 : 1

    document.getElementById('playerName').textContent = players[playerId].login
    document.getElementById('playerAvatar').src = './images/avatars/' + players[playerId].avatar
    document.getElementById('playerHP').textContent = players[playerId].healthPoints
    document.getElementById('playerMana').textContent = players[playerId].mana
    drawMana(players[playerId].mana)

    document.getElementById('opponentName').textContent = players[opponentId].login
    document.getElementById('opponentAvatar').src = './images/avatars/' + players[opponentId].avatar
    document.getElementById('opponentHP').textContent = players[opponentId].healthPoints
}

const addEventOnOpponentCard = turn => {
    const login = localStorage.getItem('login')
    if (turn === login) {
        document.getElementById('opponentCard').addEventListener('click', e => {
            if (pickedCard.id && pickedCard.isActive) {
                socket.emit('attackOpponent', roomName, login, Number(pickedCard.id))

                pickedCard.id = null
                pickedCard.isActive = false
            }
        })
    }
}

const drawMana = size => {
    mana.innerHTML = ''

    for (let i = 0; i < size; i++) {
        const manaItem = document.createElement('div')
        manaItem.classList.add('mana-item')

        mana.appendChild(manaItem)
    }
}

let interval = null

const startTimer = () => {
    let counter = 29

    interval = setInterval(() => {
        timer.textContent = counter--

        if (counter === -1) {
            timer.textContent = '30'
            clearInterval(interval)
            interval = null
            timer.style.animation = 'none'
        }

        if (counter === 4) {
            timer.style.animation = 'timer 1s infinite'
        }
    }, 1000)
}

const runLineTimerIndicator = () => {
    lineTimer.style.animation = 'none'
    lineTimer.offsetHeight
    lineTimer.style.animation = 'line 30s linear'
}
