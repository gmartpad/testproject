import { Box, Button } from '@mui/material'
import Link from 'next/link'
import { IPage } from '../AppHeader'

const NavMenuDesktop = (props: { pages: IPage[]; filterPages: (page: IPage) => boolean }) => {
    const { pages, filterPages } = props

    return (
        <Box
            sx={{
                flexGrow: 1,
                display: { xs: 'none', md: 'flex' },
                alignSelf: 'left',
                paddingLeft: 2,
            }}
        >
            {pages.filter(filterPages).map((page, k) => (
                <Link key={k} href={page.url}>
                    <Button sx={{ my: 2, color: 'white', display: 'block' }}>{page.title}</Button>
                </Link>
            ))}
        </Box>
    )
}

export default NavMenuDesktop
