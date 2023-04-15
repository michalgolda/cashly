import { StyledMain, StyledWrapper } from './PageMain.styled'

export default function PageMain({ children, ...props }) {
    return (
        <StyledWrapper {...props} data-testid="pagemain-component">
            <StyledMain>{children}</StyledMain>
        </StyledWrapper>
    )
}
