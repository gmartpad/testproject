import { AppContext } from 'contexts/App'
import { useContext } from 'react'

const Cartas = () => {

    const { name } = useContext(AppContext)

    return (
        <>
            <p>
                Tela de Cartas - Nome: {name}
            </p>
        </>
    )
}

export default Cartas