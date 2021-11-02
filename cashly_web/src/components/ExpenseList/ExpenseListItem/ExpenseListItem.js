import styled from "styled-components";
import EditButton from "./EditButton/EditButton";
import DeleteButton from "./DeleteButton/DeleteButton";

const StyledListItem = styled.li`
    display: flex;
    padding: 1rem;
    transition: .5s;
    border-radius: 2px;
    align-items: center;
    justify-content: space-between;
    border: 2px solid ${({ theme }) => theme.colors.primary400};

    &:hover { background-color: ${({ theme }) => theme.colors.gray300}; }
`;

const StyledText = styled.p`
    width: 10rem;
    font-size: ${({ theme }) => theme.font.sizes.h4};
    font-weight: ${({ theme }) => theme.font.weights.semiBold};
`;

const StyledAmount = styled(StyledText)`width: 5rem;`;

const StyledCurrency = styled(StyledText)`width: fit-content;`;

const StyledCategory = styled(StyledText)`
    transition: .5s;
    overflow: hidden;
    border-radius: 2px;
    text-align: center;
    margin: 0 .5rem 0 .5rem;
    text-overflow: ellipsis;
    padding: .5rem 1rem .5rem 1rem;
    background-color: ${({ color }) => color};
    color: ${({ theme }) => theme.colors.white}; 
    font-size: ${({ theme }) => theme.font.sizes.h5};
`;

const StyledCreatedAt = styled(StyledText)`
    text-align: center;
    margin: 0 .5rem 0 .5rem;
`;

const StyledActionsContainer = styled.div`
    display: grid;
    align-items: center;
    grid-column-gap: 1rem;
    grid-template-columns: repeat(2, auto);
`;

const StyledAmountWithCurrency = styled.div`
    width: 10rem;
    display: flex;
    margin-right: .5rem;
`;

function ExpenseListItem({ amount, category, createdAt }) {
    const { name: categoryName, color: categoryColor } = category;

    return (
        <StyledListItem>
            <StyledAmountWithCurrency>
                <StyledAmount>{amount}</StyledAmount>
                <StyledCurrency>PLN</StyledCurrency>
            </StyledAmountWithCurrency>
            <StyledCategory color={categoryColor}>{categoryName}</StyledCategory>
            <StyledCreatedAt>{createdAt}</StyledCreatedAt>
            <StyledActionsContainer>
                <EditButton />
                <DeleteButton />
            </StyledActionsContainer>
        </StyledListItem>
    );
}

export default ExpenseListItem;
