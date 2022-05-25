import styled from "styled-components";
import { Logo } from "../../../components";

const StyledContainer = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledWrapper = styled.div`
    width: 100%;
    min-width: 256px;
    max-width: 512px;
`;

const StyledLogo = styled(Logo)`
    font-size: 2.4rem;
    text-align: center;
    margin-bottom: 32px;
`;

export default function AuthLayout({ children }) {
    return (
        <StyledContainer>
            <StyledWrapper>
                <StyledLogo />
                {children}
            </StyledWrapper>
        </StyledContainer>
    )
}