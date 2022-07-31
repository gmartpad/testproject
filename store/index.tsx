import { BehaviorSubject, map } from 'rxjs'

export interface ICard {
    code: string
    image: string
    images: {
        svg: string
        png: string
    },
    value: string
    suit: string
    points?: number
}

export interface IDeckResponse {
    success: boolean
    deck_id: string
    cards: ICard[]
    remaining: number
}

export const rawDeckResponse$ = new BehaviorSubject<IDeckResponse>({
    success: false,
    deck_id: '',
    cards: [],
    remaining: 0
})

export const rawExtraCardsResponse$ = new BehaviorSubject<IDeckResponse>({
    success: false,
    deck_id: '',
    cards: [],
    remaining: 0
})

fetch('http://deckofcardsapi.com/api/deck/new/draw/?count=5')
    .then(res => res.json())
    .then((data: IDeckResponse) => {
        rawDeckResponse$.next(data)
        fetch(`http://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=3`)
            .then(res => res.json())
            .then((data: IDeckResponse) => rawExtraCardsResponse$.next(data))
    })

//

export interface IFormattedCard { 
    name: string 
    image: string 
    description: string
    points: number 
}

export interface IFormattedHand {
    cards: IFormattedCard[]
}

export const formattedDeck$ = rawDeckResponse$.pipe<IFormattedHand>(
    map(deck => ({
        cards: deck.cards.map(card => ({
            name: card.code,
            image: card.image,
            description: card.value + ' OF ' + card.suit,
            points: Math.floor(Math.random() * 11)
        }))    
    }))
)

export const formattedExtraCards$ = rawExtraCardsResponse$.pipe<IFormattedHand>(
    map(deck => ({
        cards: deck.cards.map(card => ({
            name: card.code,
            image: card.image,
            description: card.value + ' OF ' + card.suit,
            points: Math.floor(Math.random() * 11)
        }))    
    }))
)