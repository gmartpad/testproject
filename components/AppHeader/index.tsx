import { useState, useContext } from 'react'
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Divider,
    Menu,
    MenuItem,
} from '@mui/material'
import { AppContext } from 'contexts/App'
import { ColorModeContext } from 'contexts/ColorMode'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useTheme } from '@mui/material/styles'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import MenuIcon from '@mui/icons-material/Menu'

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

        if (baseName === '') {
            return 'Home'
        }

        return baseName[0].toUpperCase() + baseName.slice(1)
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
        if (name === '' && page.url === '/cartas') {
            return false
        }
        return true
    }

    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.filter(filterPages).map((page, k) => (
                                <Link key={k} href={page.url}>
                                    <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                                        {page.title}
                                    </Button>
                                </Link>
                            ))}
                        </Menu>
                    </Box>
                    <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>
                    <Divider orientation="vertical" flexItem sx={{ marginLeft: 3, marginRight: 3 }} />
                    <Typography variant="h6" component="div">
                        {ScreenName}
                    </Typography>
                    <Divider orientation="vertical" flexItem sx={{ marginLeft: 3 }} />
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
                        <Box sx={{ marginLeft: 3 }}>
                            <Typography variant="h6" fontSize={{ xs: 12, md: 16 }} component="div">{name}</Typography>
                        </Box>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default AppHeader