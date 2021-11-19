import PropTypes from "prop-types";
import styled from "styled-components";
import { useModal } from "@ebay/nice-modal-react";
import { useQueryClient, useMutation } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";

import { deleteExpense } from "../../../mutations";
import { ListItem, IconButton } from "../../../components";
import EditExpenseModal from "../EditExpenseModal/EditExpenseModal";


const StyledListItem = styled(ListItem)`
    display: grid;
    column-gap: 16px;
    align-items: center;
    justify-content: left;
    grid-template-columns: repeat(4, 1fr);
`;

const StyledSpan = styled.span`
    overflow: hidden;
    line-height: 1.7;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: ${({ theme }) => theme.fontWeights.semiBold};
`;

const StyledCategory = styled(StyledSpan)`
    color: white;
    padding: 4px 8px;
    width: min-content;
    text-align: center;
    border-radius: 2px;
    font-size: ${({ theme }) => theme.fontSizes.h6};
    background-color: ${({ theme, color }) => color ? color : theme.colors.gray600};
`;

const StyledActions = styled.div`
    display: flex;
    justify-content: right;
`;

const StyledActionButton = styled(IconButton)`color: white;`;

const StyledEditButton = styled(StyledActionButton)`
    background-color: ${({ theme }) => theme.colors.blue400};

    &:hover { background-color:  ${({ theme }) => theme.colors.blue500}; }
    &:active { background-color: ${({ theme }) => theme.colors.blue300}; }
`;

const StyledDeleteButton = styled(StyledActionButton)`
    margin-left: 16px;
    background-color: ${({ theme }) => theme.colors.red400};

    &:hover { background-color:  ${({ theme }) => theme.colors.red500}; }
    &:active { background-color: ${({ theme }) => theme.colors.red300}; }
`;

function ExpenseListItem({ id, amount, expense_category, realised_date }) {
    const queryClient = useQueryClient();
    const editExpenseModal = useModal(EditExpenseModal);
    const mutation = useMutation(deleteExpense, {
        onSuccess: () => queryClient.invalidateQueries("expenses")
    });

    const getFormatedRealisedDate = () => {
        const date = new Date(realised_date);
    
        const formatedDate = date.toLocaleDateString();

        return formatedDate;
    };

    return (
        <StyledListItem>
            <StyledSpan>{amount} PLN</StyledSpan>
            {expense_category ? (
                <StyledCategory color={expense_category.color}>
                    {expense_category.name}
                </StyledCategory>
            ) : (
                <StyledCategory>
                    Bez kategorii
                </StyledCategory>
            )}
            <StyledSpan>{getFormatedRealisedDate()}</StyledSpan>
            <StyledActions>
                <StyledEditButton 
                    icon={<FontAwesomeIcon icon={faEdit} />} 
                    onClick={() => {
                        editExpenseModal.show({ 
                            id, 
                            amount,
                            realised_date,                            
                            expense_category_id: expense_category ? expense_category.id : ""
                        });
                    }}
                />
                <StyledDeleteButton 
                    icon={<FontAwesomeIcon icon={faTrashAlt} />} 
                    onClick={() => mutation.mutate(id)}
                />
            </StyledActions>
        </StyledListItem>
    );
}

ExpenseListItem.propTypes = {
    id: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    expense_category: PropTypes.shape({
        name: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired
    }),
    created_at: PropTypes.string.isRequired
};

export default ExpenseListItem;