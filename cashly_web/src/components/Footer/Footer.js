import Image from 'next/image'

import { StyledFooter, StyledGithubLink, StyledText } from './Footer.styled'

export default function Footer(props) {
    return (
        <StyledFooter {...props}>
            <StyledText>© 2023 Cash.ly</StyledText>
            <StyledGithubLink href="https://github.com/michalgolda">
                <Image
                    style={{ color: '#cdcdcd' }}
                    src="github.svg"
                    alt="github"
                    width={24}
                    height={24}
                />
                <StyledText>michalgolda</StyledText>
            </StyledGithubLink>
        </StyledFooter>
    )
}
