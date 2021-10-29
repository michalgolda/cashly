import styled from "styled-components";
import { Layout, Button, ExpenseList } from "../components";

const StyledHeader = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

const StyledTextWrapper = styled.div`
    display: grid;
    max-width: 600px;
    margin-right: 1rem;
    grid-row-gap: 1rem;
    grid-template-rows: min-content min-content;
`;

const StyledDescription = styled.p`
    color: ${({ theme }) => theme.colors.gray600};
    font-weight: ${({ theme }) => theme.font.weights.semiBold};
`;

const StyledButton = styled(Button)`
    height: min-content;
    min-width: fit-content;
`;

const StyledWrapper = styled.div`margin: 2rem 0 2rem 0;`;

export default function Spendings() {
    const fakeData = [
        {
            id: "1",
            spend_category: {
                id: "1",
                name: "asdf",
                color: "#f00"
            },
            amount: 12.00,
            created_at: "12.10.2021"
        },
        {
            id: "2",
            spend_category: {
                id: "2",
                name: "abcd",
                color: "#f00"
            },
            amount: 3.23,
            created_at: "09.12.2023"
        }
    ];

    return (
        <Layout>
            <StyledHeader>
                <StyledTextWrapper>
                    <h2>Lista wydatków</h2>
                    <StyledDescription>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Fusce dui nulla, facilisis eu imperdiet non, rhoncus quis nibh. 
                        Praesent rutrum viverra iaculis. 
                        Phasellus commodo orci vitae venenatis consequat. 
                    </StyledDescription>
                </StyledTextWrapper>
                <StyledButton variant="primaryOutline">Dodaj wydatek</StyledButton>
            </StyledHeader>
            <StyledWrapper>
                <ExpenseList data={fakeData} />
            </StyledWrapper>
        </Layout>
    );
}