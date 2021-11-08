import { useQuery } from "react-query";
import styled from "styled-components";
import { useModal } from "@ebay/nice-modal-react";

import { getAllCategories } from "../../queries";
import { 
    Page,
    Error,
    Layout, 
    Button, 
    Section,
    CategoryList 
} from "../../components";
import AddCategoryModal from "./AddCategoryModal/AddCategoryModal";


const StyledButton = styled(Button)`
    min-width: fit-content;
    height: min-content;
`;

const StyledWrapper = styled.div`margin: 2rem 0 2rem 0;`;

export default function Categories() {
    const addCategoryModal = useModal(AddCategoryModal);
    const { data, isLoading, isError } = useQuery("categories", getAllCategories);

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
                    <StyledButton 
                        variant="primaryOutline"
                        onClick={() => addCategoryModal.show()}
                    >
                        Dodaj kategorie
                    </StyledButton>
                </Section>
                <StyledWrapper>
                    {isError ? (
                        <Error message={`
                            Wystąpił nieoczekiwany błąd podczas ładowania listy kategorii.
                            Autor aplikacji został poinformany o błędzie i postara się go jak najszybciej naprawić.
                        `} />
                    ) : (
                        <CategoryList 
                            data={data}
                            showLoader={isLoading}
                        />
                    )}
                </StyledWrapper>
            </Layout>
        </Page>
    );
}