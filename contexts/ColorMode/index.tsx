import { createContext, ReactNode, useState, useMemo, useEffect } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'

interface ColorModeContextProps {
    children: ReactNode
}

type PaletteMode = 'dark' | 'light'

interface IColorModeContext {
    toggleColorMode: () => void
}

const initialValue = {
    toggleColorMode: () => undefined
}

export const ColorModeContext = createContext<IColorModeContext>(initialValue)

export const ColorModeContextProvider = ({ children }: ColorModeContextProps) => {

    const initialMode = () => {
        const colorMode = localStorage.getItem('colorMode')
        if (!colorMode) {
            localStorage.setItem('colorMode', 'light')
            return 'light'
        } else {
            return colorMode === 'light' ? 'light' : 'dark'
        }
    }

    const [mode, setMode] = useState<PaletteMode>('light')
    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => {
                    if (prevMode === 'light') {
                        localStorage.setItem('colorMode', 'dark')
                        return 'dark'
                    } else {
                        localStorage.setItem('colorMode', 'light')
                        return 'light'
                    }
                })
            },
        }),
        [],
    )

    const theme = useMemo(
        () => createTheme({
            palette: {
                mode,
            },
        }),
        [mode],
    )

    useEffect(()=>{
        setMode(initialMode)
    }, [])

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}