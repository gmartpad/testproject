import Layout from 'components/Layout'
import { AppContext } from 'contexts/App'
import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material'
import { formattedDeck$, formattedExtraCards$, IFormattedHand } from 'store'
import Image from 'next/image'

const Cartas = () => {

    const { name } = useContext(AppContext)
    const router = useRouter()

    const [isBeingRedirected, setIsBeingRedirected] = useState(true)
    
    const [hand, setHand] = useState<IFormattedHand>({ cards: [] })
    const [extraCards, setExtraCards] = useState<IFormattedHand>({ cards: [] })
    const [displayHand, setDisplayHand] = useState<IFormattedHand>({ cards: [] })

    const [addCardCounter, setAddCardCounter] = useState<number>(3)

    const [, setCardImageRatio] = useState(226/314) // resolucao original

    const drawCard = () => {
        const drawnCard = extraCards.cards[addCardCounter-1]
        setDisplayHand((prevHand) => ({ cards: [...prevHand.cards, drawnCard] }))
        setAddCardCounter(prevCounter => prevCounter - 1)
    }

    const shuffleHand = () => {
        const shuffled = displayHand.cards.sort(() => Math.random() - 0.5)
        setDisplayHand({ cards: shuffled })
    }

    useEffect(() => {
        if(name === ''){
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
            {isBeingRedirected 
                ? (
                    <CircularProgress/>
                )
                : (
                    <Box>
                        <Box
                            sx={{
                                display: 'flex',
                                width: '100%',
                                justifyContent: 'space-around',
                            }}
                        >
                            <Button
                                onClick={drawCard}
                                disabled={!addCardCounter}
                                variant="contained"
                                color="success"
                            >
                                Comprar 1
                            </Button>
                            <Button
                                onClick={shuffleHand}
                                variant="contained"
                                color="secondary"
                            >
                                Embaralhar
                            </Button>
                        </Box>
                        <Grid 
                            container
                            sx={{
                                paddingTop: '4vh',
                                paddingBottom: '4vh'
                            }}
                        >
                            {displayHand.cards.map((card, key) => (
                                <Grid 
                                    item 
                                    key={key}
                                    xs={6}
                                    md={3}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        padding: '1vw'
                                    }}
                                >
                                    <Image 
                                        alt={card.description}
                                        src={card.image} 
                                        width={150} 
                                        height={209} 
                                        layout="fixed"
                                        onLoadingComplete={({ naturalWidth, naturalHeight }) => 
                                            setCardImageRatio(naturalWidth/naturalHeight)
                                        }
                                    />
                                    <Box>
                                        <Typography align='center'>Nome: {card.name}</Typography>
                                        <Typography align='center'>Descrição: {card.description}</Typography>
                                        <Typography align='center'>Pontos: {card.points}</Typography>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                        <Box
                            sx={{
                                display: 'flex',
                                width: '100%',
                                justifyContent: 'space-around',
                            }}
                        >
                            <Button
                                onClick={drawCard}
                                disabled={!addCardCounter}
                                variant="contained"
                                color="success"
                            >
                                Comprar 1
                            </Button>
                            <Button
                                onClick={shuffleHand}
                                variant="contained"
                                color="secondary"
                            >
                                Embaralhar
                            </Button>
                        </Box>
                    </Box>
                )
            }
        </Layout>
    )
}

export default Cartas