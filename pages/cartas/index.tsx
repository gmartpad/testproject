import Layout from 'components/Layout'
import { AppContext } from 'contexts/App'
import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Box, CircularProgress } from '@mui/material'
import { formattedDeck$, formattedExtraCards$, IFormattedHand } from 'store'
import CardButtonContainer from 'components/CardButtonContainer'
import CardList from 'components/CardList'

const Cartas = () => {
    const { name } = useContext(AppContext)
    const router = useRouter()

    const [isBeingRedirected, setIsBeingRedirected] = useState(true)

    const [hand, setHand] = useState<IFormattedHand>({ cards: [] })
    const [extraCards, setExtraCards] = useState<IFormattedHand>({ cards: [] })
    const [displayHand, setDisplayHand] = useState<IFormattedHand>({ cards: [] })

    const [addCardCounter, setAddCardCounter] = useState<number>(3)

    const [, setCardImageRatio] = useState(226 / 314) // resolucao original

    const drawCard = () => {
        const drawnCard = extraCards.cards[addCardCounter - 1]
        setDisplayHand((prevHand) => ({ cards: [...prevHand.cards, drawnCard] }))
        setAddCardCounter((prevCounter) => prevCounter - 1)
    }

    const shuffleHand = () => {
        const shuffled = displayHand.cards.sort(() => Math.random() - 0.5)
        setDisplayHand({ cards: shuffled })
    }

    useEffect(() => {
        if (name === '') {
            router.replace('/')
        } else {
            setIsBeingRedirected(false)
        }
    }, [name])

    useEffect(() => {
        const subFormattedDeck = formattedDeck$.subscribe(setHand)
        const subFormattedExtraCards = formattedExtraCards$.subscribe(setExtraCards)
        return () => {
            subFormattedDeck.unsubscribe()
            subFormattedExtraCards.unsubscribe()
        }
    }, [])

    useEffect(() => {
        setDisplayHand(hand)
    }, [hand])

    return (
        <Layout>
            {isBeingRedirected ? (
                <CircularProgress />
            ) : (
                <Box>
                    <CardButtonContainer
                        drawCard={drawCard}
                        addCardCounter={addCardCounter}
                        shuffleHand={shuffleHand}
                    />
                    <CardList
                        displayHand={displayHand}
                        setCardImageRatio={setCardImageRatio}
                    />
                    <CardButtonContainer
                        drawCard={drawCard}
                        addCardCounter={addCardCounter}
                        shuffleHand={shuffleHand}
                    />
                </Box>
            )}
        </Layout>
    )
}

export default Cartas
