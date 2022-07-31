import { MouseEvent } from 'react'
import { Box, Button, IconButton, Menu } from '@mui/material'
import Link from 'next/link'
import MenuIcon from '@mui/icons-material/Menu'
import { IPage } from '../AppHeader'

type AnchorElNavType = HTMLElement | null

const NavMenuMobile = (props: {
    handleOpenNavMenu: (event: MouseEvent<HTMLElement>) => void
    anchorElNav: AnchorElNavType
    handleCloseNavMenu: () => void
    pages: IPage[]
    filterPages: (page: IPage) => boolean
}) => {
    const { handleOpenNavMenu, anchorElNav, handleCloseNavMenu, pages, filterPages } = props

    return (
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
                size='large'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleOpenNavMenu}
                color='inherit'
            >
                <MenuIcon />
            </IconButton>
            <Menu
                id='menu-appbar'
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
    )
}

export default NavMenuMobile
