import type { NextPage } from 'next'
import BaseFooter from 'components/BaseFooter'
import BaseHead from 'components/BaseHead'
import NameForm from 'components/NameForm'
import { Container, Main } from 'styles/styled'

const Home: NextPage = () => {

    return (
        <Container>
            <BaseHead />
            <Main>
                <NameForm/>
            </Main>
            <BaseFooter />
        </Container>
    )
}

export default Home
