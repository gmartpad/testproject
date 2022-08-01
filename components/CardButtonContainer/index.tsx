import { Box, Button } from '@mui/material'

const CardButtonContainer = (props: {
    drawCard: () => void,
    addCardCounter: number,
    shuffleHand: () => void
}) => {

    const { drawCard, addCardCounter, shuffleHand } = props

    return (
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
                variant='contained'
                color='success'
            >
                Comprar 1
            </Button>
            <Button onClick={shuffleHand} variant='contained' color='secondary'>
                Embaralhar
            </Button>
        </Box>
    )
}

export default CardButtonContainer