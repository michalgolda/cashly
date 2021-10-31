import styled from "styled-components";
import { Layout, Section, Button, CategoryList, Page } from "../components";

const StyledButton = styled(Button)`
    width: fit-content;
    height: min-content;
`;

const StyledWrapper = styled.div`margin: 2rem 0 2rem 0;`;

export default function Categories() {
    const fakeData = [
        {
            id: "1",
            name: "test1",
            color: "#f00"
        },
        {
            id: "2",
            name: "test2",
            color: "#f00"
        }
    ];

    return (
        <Page title="Cashly - Kategorie">
            <Layout>
                <Section
                    title="Lista kategorii"
                    description={`
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Fusce dui nulla, facilisis eu imperdiet non, rhoncus quis nibh. 
                        Praesent rutrum viverra iaculis. 
                        Phasellus commodo orci vitae venenatis consequat.
                    `}
                >
                    <StyledButton variant="primaryOutline">Dodaj kategorie</StyledButton>
                </Section>
                <StyledWrapper>
                    <CategoryList data={fakeData} />
                </StyledWrapper>
            </Layout>
        </Page>
    );
}