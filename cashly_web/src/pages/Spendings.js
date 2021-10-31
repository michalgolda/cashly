import styled from "styled-components";
import { Layout, Button, ExpenseList, Section, Page } from "../components";

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
        <Page title="Cashly - Wydatki">
            <Layout>
                <Section
                    title="Lista wydatków"
                    description={`
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Fusce dui nulla, facilisis eu imperdiet non, rhoncus quis nibh. 
                        Praesent rutrum viverra iaculis. 
                        Phasellus commodo orci vitae venenatis consequat.
                    `}
                >
                    <StyledButton variant="primaryOutline">Dodaj wydatek</StyledButton>
                </Section>
                <StyledWrapper>
                    <ExpenseList data={fakeData} />
                </StyledWrapper>
            </Layout>
        </Page>
    );
}