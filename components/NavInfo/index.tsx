import { useContext } from 'react'
import { Typography, IconButton, Divider } from '@mui/material'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { ColorModeContext } from 'contexts/ColorMode'
import { useTheme } from '@mui/material/styles'
import { useRouter } from 'next/router'

const NavInfo = () => {
    const theme = useTheme()
    const colorMode = useContext(ColorModeContext)

    const { asPath } = useRouter()

    const asPathToScreenName = (asPath: string) => {
        const baseName = asPath.split('/')[1]

        if (baseName === '') {
            return 'Home'
        }

        return baseName[0].toUpperCase() + baseName.slice(1)
    }

    const ScreenName = asPathToScreenName(asPath)

    return (
        <>
            <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color='inherit'>
                {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            <Divider orientation='vertical' flexItem sx={{ marginLeft: 3, marginRight: 3 }} />
            <Typography variant='h6' component='div'>
                {ScreenName}
            </Typography>
            <Divider orientation='vertical' flexItem sx={{ marginLeft: 3 }} />
        </>
    )
}

export default NavInfo
