import Image from 'next/image'
import { Footer, FooterAnchor, Logo } from './styled'

function BaseFooter() {
    return (
        <Footer>
            <FooterAnchor
                href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
                target='_blank'
                rel='noopener noreferrer'
            >
                Powered by{' '}
                <Logo>
                    <Image src='/vercel.svg' alt='Vercel Logo' width={72} height={16} />
                </Logo>
            </FooterAnchor>
        </Footer>
    )
}

export default BaseFooter