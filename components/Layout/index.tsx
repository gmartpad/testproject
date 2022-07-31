import AppHeader from 'components/AppHeader'
import BaseFooter from 'components/BaseFooter'
import BaseHead from 'components/BaseHead'
import { ReactNode } from 'react'
import { Main } from 'styles/styled'
import Paper from '@mui/material/Paper'

interface LayoutProps {
    children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <Paper>
            <BaseHead />
            <AppHeader />
            <Main>{children}</Main>
            <BaseFooter />
        </Paper>
    )
}

export default Layout
