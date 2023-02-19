import { StyledMain, StyledWrapper } from './PageMain.styled'

export default function PageMain({ children, ...props }) {
    return (
        <StyledWrapper {...props}>
            <StyledMain>{children}</StyledMain>
        </StyledWrapper>
    )
}
