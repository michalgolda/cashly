import { useQuery } from "react-query";
import styled from "styled-components";
import { getAllExpenses } from "../queries";
import {
    Page,
    Error,
    Layout,
    Button,
    Section,
    ExpenseList } from "../components";

const StyledButton = styled(Button)`
    height: min-content;
    min-width: fit-content;
`;

const StyledWrapper = styled.div`margin: 2rem 0 2rem 0;`;

export default function Expenses() {
    const { data, isLoading, isError } = useQuery("expenses", getAllExpenses);

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
                    {isError ? (
                        <Error message={`
                        Wystąpił nieoczekiwany błąd podczas ładowania listy wydatków.
                        Autor aplikacji został poinformany o błędzie i postara się go jak najszybciej naprawić. 
                        `} />
                    ) : (
                        <ExpenseList 
                            data={data} 
                            showLoader={isLoading} 
                        />
                    )}
                </StyledWrapper>
            </Layout>
        </Page>
    );
}