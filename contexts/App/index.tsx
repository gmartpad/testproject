import { createContext, ReactNode, useState, SetStateAction, Dispatch } from 'react'

interface AppContextProps {
    children: ReactNode
}

interface IAppContext {
    name: string
    setName: Dispatch<SetStateAction<string>>
}

const initialValue = {
    name: '',
    setName: () => undefined,
}

export const AppContext = createContext<IAppContext>(initialValue)

export const AppContextProvider = ({ children }: AppContextProps) => {
    const [name, setName] = useState(initialValue.name)

    return <AppContext.Provider value={{ name, setName }}>{children}</AppContext.Provider>
}
