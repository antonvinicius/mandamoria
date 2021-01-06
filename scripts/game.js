let game = {

    lockMode: false,
    firstCard: null,
    secondCard: null,

    setCard: function (id) {
        let card = this.cards.filter(card => card.id === id)[0]
        if (card.flipped || this.lockMode)
            return false
        if (!this.firstCard){
            this.firstCard = card
            this.firstCard.flipped = true
            return true
        }else{
            this.secondCard = card
            this.secondCard.flipped = true
            this.lockMode = true
            return true
        }

    },

    checkMatch: function(){
        if(!this.firstCard || !this.secondCard)
            return false
        return this.firstCard.icon === this.secondCard.icon
    },

    clearCards: function() {
        this.firstCard = null
        this.secondCard = null
        this.lockMode = false
    },

    unflipCards: function() {
            this.firstCard.flipped = false
            this.secondCard.flipped = false
            this.clearCards()
    },

    checkGameOver() {
        return this.cards.filter(card => !card.flipped).length == 0
    },

    characters: ['baby-yoda',
        'cara-dune',
        'greef-karga',
        'ig-11',
        'kuiil',
        'mandalorian',
        'moff-gideon',
        'mudhorn',
        'the-armorer',
        'the-client'
    ],
    cards: null,

    createCardsFromCharacters: function () {
        let cards = []
        for (let character of this.characters) {
            cards.push(this.createPairFromCharacter(character))
        }

        return cards.flatMap(pair => pair)
    },

    shuffleCards: function () {
        let currentIndex = this.cards.length
        let randomIndex = 0

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex--

            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]]
        }
    },

    createPairFromCharacter: function (character) {
        return [{
            id: this.createIdForCharacter(character),
            icon: character,
            flipped: false
        }, {
            id: this.createIdForCharacter(character),
            icon: character,
            flipped: false
        }]
    },

    createIdForCharacter: function (character) {
        return character + parseInt(Math.random() * 1000)
    }
}