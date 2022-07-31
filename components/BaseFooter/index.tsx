import { useTheme } from '@mui/material/styles'
import {
    Box,
    Link as MuiLink,
    Typography,
    Divider
} from '@mui/material' 

function BaseFooter() {

    const theme = useTheme()

    return (
        <>
            <Divider/>
            <Box 
                component="footer"
                sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    padding: '2vw',
                }}
            >
                <MuiLink
                    href='https://www.linkedin.com/in/gabriel-martins-padoin-0aba40153/'
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    <Typography 
                        variant="h6"
                        component="div"
                        sx={{
                            flexGrow: 1,
                            color: theme.palette.primary.light
                        }}
                    >
                        Feito por Gabriel Martins Padoin
                    </Typography>
                </MuiLink>
                <MuiLink
                    href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    <Typography 
                        variant="h6" 
                        component="div" 
                        sx={{ 
                            flexGrow: 1,
                            color: theme.palette.primary.light
                        }}
                    >
                        Distribuído por Vercel.
                    </Typography>
                </MuiLink>
            </Box>
        </>
    )
}

export default BaseFooter