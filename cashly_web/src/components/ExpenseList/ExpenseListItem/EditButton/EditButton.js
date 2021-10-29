import styled from "styled-components";
import { Button } from "../../../../components";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const StyledButton = styled(Button)`
    border: none;
    background-color: ${({ theme }) => theme.colors.blue400};

    &:hover { background-color: ${({ theme }) => theme.colors.blue500}; }
    &:active { background-color: ${({ theme }) => theme.colors.blue300}; }
`;

export default function EditButton(props) {
    return (
        <StyledButton
            size="medium"
            {...props}
        >
            <FontAwesomeIcon icon={faEdit} />
        </StyledButton>
    );
}