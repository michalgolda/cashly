import styled from "styled-components";
import { Button } from "../../../../components";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const StyledButton = styled(Button)`
    border: none;
    background-color: ${({ theme }) => theme.colors.red400};

    &:hover { background-color: ${({ theme }) => theme.colors.red500}; }
    &:active { background-color: ${({ theme }) => theme.colors.red300}; }
`;

export default function DeleteButton(props) {
    return (
        <StyledButton
            size="medium"
            {...props}
        >
            <FontAwesomeIcon icon={faTrash} />
        </StyledButton>
    );
}