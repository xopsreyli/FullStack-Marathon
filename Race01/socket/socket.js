const jwt = require('jsonwebtoken')
const service = require('../services/socketService')
const Game = require('../entities/Game')
const Player = require('../entities/Player')

module.exports = (io) => {
    io.use((socket, next) => {
        const token = socket.handshake.auth.token

        if (!token) {
            return next(new Error('Authentication error: No token provided'))
        }

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, result) => {
            if (err) {
                return next(new Error('Authentication error: Invalid token'))
            }

            socket.user = result
            next()
        })
    })

    let queue = []
    let games = []

    io.on('connection', (socket) => {
        socket.on('findOpponent', async () => {
            const user = await service.getPlayer(socket.user.login)
            const player1 = new Player(user.login, user.avatar)

            if (queue.length === 0) {
                return queue.push({
                    player: player1,
                    socketId: socket.id
                })
            }

            const {player: player2, socketId: player2SocketId} = queue.shift()

            const roomName = `${player1.login}-${player2.login}`
            socket.join(roomName)
            io.sockets.sockets.get(player2SocketId).join(roomName)

            games[roomName] = new Game([player1, player2], await service.getCards())

            io.to(roomName).emit('gameReady', {room: roomName})
        })

        socket.on('stopSearching', () => {
            queue = queue.filter(o => o.player.login !== socket.user.login)
        })

        socket.on('joinRoom', room => {
            socket.join(room)

            if (io.sockets.adapter.rooms.get(room)?.size === 2) {
                io.to(room).emit('gameInfo', games[room])

                startGameTimer(room, io)
            }
        })

        socket.on('playCard', (room, login, cardId) => {
            let game = games[room]

            game.players.forEach(player => {
                if (player.login === login) {
                    const index = player.cards.findIndex(card => card.id === cardId)
                    const [cardToPlay] = player.cards.splice(index, 1)
                    player.mana -= cardToPlay.price
                    player.activeCards.push(cardToPlay)
                }
            })

            io.to(room).emit('gameInfo', game)
        })

        socket.on('attackCard', (room, login, cardId, cardToAttackId) => {
            let game = games[room]
            let playerCard, opponentCard

            game.players.forEach(player => {
                if (player.login === login) {
                    playerCard = player.activeCards.find(card => card.id === cardId)
                } else {
                    opponentCard = player.activeCards.find(card => card.id === cardToAttackId)
                }
            })

            game.players.forEach(player => {
                if (player.login === login) {
                    player.activeCards.map(card => {
                        if (card.id === cardId) {
                            card.points_of_defence -= opponentCard.points_of_attack
                        }
                    })
                } else {
                    player.activeCards.map(card => {
                        if (card.id === cardToAttackId) {
                            card.points_of_defence -= playerCard.points_of_attack
                        }
                    })
                }

                player.activeCards = player.activeCards.filter(card => card.points_of_defence > 0)
            })

            io.to(room).emit('gameInfo', game)
        })

        socket.on('attackOpponent', (room, login, cardId) => {
            let game = games[room]
            let card = null

            game.players.forEach(player => {
                if (player.login === login) {
                    card = player.activeCards.find(card => card.id === cardId)
                }
            })

            game.players.forEach(player => {
                if (player.login !== login) {
                    player.healthPoints -= card.points_of_attack

                    if (player.healthPoints < 0) {
                        io.to(room).emit('gameOver', {
                            winner: login,
                            loser: player.login,
                            winnerMessage: 'You are the champion of this round!'
                        })
                    }
                }
            })

            io.to(room).emit('gameInfo', game)
        })

        socket.on('giveUp', room => {
            const opponentLogin = room.split('-').find(login => login !== socket.user.login)

            io.to(room).emit('gameOver', {
                winner: opponentLogin,
                loser: socket.user.login,
                winnerMessage: 'Congratulations! Your opponent has surrendered. You win the game!'
            })
        })

        socket.on('disconnect', () => {
            queue = queue.filter(o => o.player.login !== socket.user.login)
        })
    })

    const startGameTimer = (room, io) => {
        let game = games[room]

        let currentPlayerId = game.players.findIndex(p => p.login === game.turn)

        let interval = setInterval(() => {
            currentPlayerId = (currentPlayerId + 1) % game.players.length

            game.turn = game.players[currentPlayerId].login

            game.players[currentPlayerId].addMana()

            const cardsNeed = 5 - game.players[currentPlayerId].cards.length

            if (cardsNeed > 0 && game.cards.length > 0) {
                const cardsToTake = game.cards.slice(0, cardsNeed)
                game.cards.splice(0, cardsNeed)
                game.players[currentPlayerId].cards.push(...cardsToTake)
            }

            io.to(room).emit('gameInfo', game)
        }, 30000)
    }
}
