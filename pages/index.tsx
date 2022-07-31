import type { NextPage } from 'next'
import Layout from 'components/Layout'
import NameForm from 'components/NameForm'

const Home: NextPage = () => {
    return (
        <Layout>
            <NameForm />
        </Layout>
    )
}

export default Home
