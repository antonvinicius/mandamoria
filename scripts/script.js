const FRONT = 'card-front'
const BACK = 'card-back'
const CARD = 'card'
const ICON = 'icon'

let audio_src = document.getElementById('audio-src')

startGame()

function startGame() {
    game.cards = game.createCardsFromCharacters()
    game.shuffleCards(game.cards)
    initializeCards(game.cards)
}

function initializeCards(cards) {
    let gameBoard = document.getElementById('gameBoard')
    gameBoard.innerHTML = ''
    cards.forEach(card => {
        let cardElement = document.createElement('div')
        cardElement.id = card.id
        cardElement.classList.add(CARD)
        cardElement.dataset.icon = card.icon

        createCardContent(card, cardElement)

        cardElement.addEventListener('click', flipCard)
        gameBoard.appendChild(cardElement)
    })
}

function createCardContent(card, cardElement) {
    createCardFace(FRONT, card, cardElement)
    createCardFace(BACK, card, cardElement)
}

function createCardFace(face, card, element) {
    let cardElementFace = document.createElement('div')
    cardElementFace.classList.add(face)
    if (face === FRONT) {
        let iconElement = document.createElement('img')
        iconElement.classList.add(ICON)
        iconElement.src = './assets/images/' + card.icon + '.png'
        cardElementFace.appendChild(iconElement)
    } else {
        let backIconElement = document.createElement('img')
        backIconElement.src = './assets/images/back-icon.png'
        cardElementFace.appendChild(backIconElement)
    }
    element.appendChild(cardElementFace)
}


function flipCard() {
    if (game.setCard(this.id)) {
        this.classList.add('flip')
        if (game.secondCard) {

            if (game.checkMatch()) {
                game.clearCards()
                if (game.checkGameOver()) {
                    let gameOverLayer = document.getElementById('gameOver')
                    gameOverLayer.style.display = 'flex'
                }
            } else {
                setTimeout(() => {
                    let firstCardView = document.getElementById(game.firstCard.id)
                    let secondCardView = document.getElementById(game.secondCard.id)

                    firstCardView.classList.remove('flip')
                    secondCardView.classList.remove('flip')
                    game.unflipCards()
                }, 800)
            }
        }
    }
}

function restart() {
    game.clearCards()
    startGame()
    let gameOverLayer = document.getElementById('gameOver')
    gameOverLayer.style.display = 'none'
}

function play() {
    audio_src.play()
}

function pause() {
    audio_src.pause()
}

function stop() {
    audio_src.pause()
    audio_src.currentTime = 0
}