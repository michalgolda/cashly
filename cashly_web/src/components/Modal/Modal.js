import PropTypes from "prop-types";
import styled from "styled-components";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../../components";

const StyledWrapper = styled.div`
    top: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    position: fixed;
    align-items: center;
    justify-content: center;
    background-color: rgb(30, 33, 37, .5);
`;

const StyledModal = styled.div`
    width: 100%;
    max-width: 512px;
    border-radius: 2px;
    background-color: ${({ theme }) => theme.colors.white};
`;

const StyledModalHeader = styled.div`
    display: flex;
    padding: .5rem;
    justify-content: flex-end;
    border-bottom: 2px solid ${({ theme }) => theme.colors.gray300};
`;

const StyledModalBody = styled.div`
    padding: .5rem;
    max-height: 60vh;
`;

const StyledModalCloseButton = styled(props => <Button {...props} />)`
    padding: 0;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
`;

function Modal({ children }) {
    return (
        <StyledWrapper>
            <StyledModal>
                <StyledModalHeader>
                    <StyledModalCloseButton
                        size="large"
                        variant="secondary"
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </StyledModalCloseButton>
                </StyledModalHeader>
                <StyledModalBody>
                    {children}
                </StyledModalBody>
            </StyledModal>
        </StyledWrapper>
    );
}

Modal.propTypes = { children: PropTypes.node.isRequired };

export default Modal;