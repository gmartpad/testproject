import Layout from 'components/Layout'
import { AppContext } from 'contexts/App'
import { useContext, useLayoutEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { CircularProgress } from '@mui/material'

const Cartas = () => {

    const { name } = useContext(AppContext)
    const router = useRouter()

    const [isBeingRedirected, setIsBeingRedirected] = useState(true)

    useLayoutEffect(() => {
        if(name === ''){
            router.replace('/')
        } else {
            setIsBeingRedirected(false)
        }
    }, [name])

    return (
        <Layout>
            {isBeingRedirected 
                ? (
                    <CircularProgress/>
                )
                : (
                    <p>
                        Tela de Cartas
                    </p>
                )
            }
        </Layout>
    )
}

export default Cartas