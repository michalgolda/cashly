import Image from 'next/image'

import Informer from '@/components/Informer/Informer'
import LinkButton from '@/components/LinkButton/LinkButton'

import { StyledContainer } from './NotFound.styled'

export default function NotFound() {
    return (
        <StyledContainer>
            <Informer
                illustration={
                    <Image src="/notFound.svg" alt="not found" fill />
                }
                bottomElement={<LinkButton href="/">Powrót</LinkButton>}
                text="Strona, której szukasz nie istnieje lub została przeniesiona"
            />
        </StyledContainer>
    )
}
