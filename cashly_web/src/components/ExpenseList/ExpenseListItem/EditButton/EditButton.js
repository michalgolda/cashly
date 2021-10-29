import styled from "styled-components";
import { Button } from "../../../../components";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const StyledButton = styled(Button)`background-color: blue;`;

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