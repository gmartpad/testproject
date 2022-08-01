import { Box, Grid, Typography, CircularProgress } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'
import Image from 'next/image'
import { IFormattedHand } from 'store'

const CardList = (props: {
    displayHand: IFormattedHand,
    setCardImageRatio: Dispatch<SetStateAction<number>>,
}) => {

    const { displayHand, setCardImageRatio } = props

    return (
        <Grid
            container
            sx={{
                paddingTop: '4vh',
                paddingBottom: '4vh',
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
                        padding: '1vw',
                    }}
                >
                    <Image
                        alt={card.description}
                        src={card.image}
                        width={150}
                        height={209}
                        layout='fixed'
                        onLoadingComplete={({ naturalWidth, naturalHeight }) =>
                            setCardImageRatio(naturalWidth / naturalHeight)
                        }
                    />
                    <Box>
                        <Typography align='center'>Nome: {card.name}</Typography>
                        <Typography align='center'>
                            Descrição: {card.description}
                        </Typography>
                        <Typography align='center'>Pontos: {card.points}</Typography>
                    </Box>
                </Grid>
            ))}
        </Grid>
    )
}

export default CardList