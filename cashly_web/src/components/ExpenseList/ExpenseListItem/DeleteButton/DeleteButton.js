import styled from "styled-components";
import { Button } from "../../../../components";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const StyledButton = styled(Button)`background-color: red;`;

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