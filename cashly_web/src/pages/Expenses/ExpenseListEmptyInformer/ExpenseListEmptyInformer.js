import styled from 'styled-components';
import { Informer } from "../../../components";
import VoidIllustration from "../../../assets/void.svg";
import AddExpenseButton from "../AddExpenseButton/AddExpenseButton";
import ImportExpenseButton from "../ImportExpensesButton/ImportExpensesButton";

const ButtonContainer = styled.div`
    display: flex;
    column-gap: 2rem;
    justify-content: center;
`;

export default function ExpenseListEmptyInformer() {
    return (
        <Informer
            bottomElement={
                <ButtonContainer>
                    <AddExpenseButton />
                    <ImportExpenseButton />
                </ButtonContainer>
            }
            illustrationSource={VoidIllustration}
            illustrationStyles={{maxWidth: "128px"}}
            text={"Aktualnie lista wydatków jest pusta"} 
        />
    );
}