import Image from 'next/image'

import { StyledWrapper } from './Logo.styled'

export default function Logo(props) {
    return (
        <StyledWrapper>
            <Image
                src="/logo.svg"
                alt="logo"
                width={190}
                height={57.9}
                priority
                {...props}
            />
        </StyledWrapper>
    )
}
