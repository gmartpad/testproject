import { useState, useContext } from 'react'
import { 
    AppBar,
    Box,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Divider
} from '@mui/material'
import { AppContext } from 'contexts/App'
import { ColorModeContext } from 'contexts/ColorMode'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useTheme } from '@mui/material/styles'
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

interface IPage { 
    title: string 
    url: string 
}

const AppHeader = () => {

    const { name } = useContext(AppContext)
    const theme = useTheme()
    const colorMode = useContext(ColorModeContext)
    const { asPath } = useRouter()

    const asPathToScreenName = (asPath: string) => {
        const baseName = asPath.split('/')[1]

        if(baseName === ''){
            return 'Home'
        }

        return baseName[0].toUpperCase()+baseName.slice(1)
    }

    const ScreenName = asPathToScreenName(asPath)

    const [pages] = useState<IPage[]>([
        {
            title: 'Home',
            url: '/'
        },
        {
            title: 'Cartas',
            url: '/cartas'
        }
    ])

    const filterPages = (page: IPage) => {
        if(name === '' && page.url === '/cartas'){
            return false
        }
        return true
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ marginRight: 3 }}>
                        {ScreenName}
                    </Typography>
                    <Divider orientation="vertical" flexItem />
                    <Box sx={{ 
                        flexGrow: 1, 
                        display: { xs: 'none', md: 'flex' },
                        alignSelf: 'left',
                        paddingLeft: 2
                    }}>
                        {pages.filter(filterPages).map((page, k) => (
                            <Link key={k} href={page.url}>
                                <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                                    {page.title}
                                </Button>
                            </Link>
                        ))}
                    </Box>
                    {name !== '' && (
                        <div>
                            <p>{name}</p>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default AppHeader