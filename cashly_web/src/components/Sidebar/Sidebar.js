import styled from "styled-components";
import { Button } from "../../components";

const StyledContainer = styled.nav`
    display: grid;
    max-width: 300px;
    min-width: 256px;
    grid-row-gap: 1rem;
    height: calc(100vh - 73px);
    grid-auto-rows: min-content;
    padding: 1rem 2rem 1rem 2rem;
    border-right: 1px solid ${({ theme }) => theme.colors.gray500};
`;

export default function Sidebar() {
    return (
        <StyledContainer>
            <Button size="small" variant="primaryOutline" fullWidth>Wydatki</Button>
            <Button size="small" variant="primaryOutline" fullWidth>Kategorie wydatków</Button>
        </StyledContainer>
    );
}

