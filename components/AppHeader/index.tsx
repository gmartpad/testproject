import { useState, useContext } from 'react'
import { AppBar, Box, Toolbar, Typography } from '@mui/material'
import { AppContext } from 'contexts/App'
import NavMenuMobile from '../NavMenuMobile'
import NavInfo from 'components/NavInfo'
import NavMenuDesktop from 'components/NavMenuDesktop'

export interface IPage {
    title: string
    url: string
}

const AppHeader = () => {
    const { name } = useContext(AppContext)

    const [pages] = useState<IPage[]>([
        {
            title: 'Home',
            url: '/',
        },
        {
            title: 'Cartas',
            url: '/cartas',
        },
    ])

    const filterPages = (page: IPage) => {
        if (name === '' && page.url === '/cartas') {
            return false
        }
        return true
    }

    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget)
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='static'>
                <Toolbar>
                    <NavMenuMobile
                        handleOpenNavMenu={handleOpenNavMenu}
                        anchorElNav={anchorElNav}
                        handleCloseNavMenu={handleCloseNavMenu}
                        pages={pages}
                        filterPages={filterPages}
                    />
                    <NavInfo />
                    <NavMenuDesktop pages={pages} filterPages={filterPages} />
                    {name !== '' && (
                        <Box sx={{ marginLeft: 3 }}>
                            <Typography variant='h6' fontSize={{ xs: 12, md: 16 }} component='div'>
                                {name}
                            </Typography>
                        </Box>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default AppHeader
