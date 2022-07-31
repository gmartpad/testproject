import type { AppProps } from 'next/app'
import { ColorModeContextProvider } from 'contexts/ColorMode'
import { AppContextProvider } from 'contexts/App'
import CssBaseline from '@mui/material/CssBaseline'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ColorModeContextProvider>
            <AppContextProvider>
                <CssBaseline />
                <Component {...pageProps} />
            </AppContextProvider>
        </ColorModeContextProvider>
    )
}

export default MyApp
