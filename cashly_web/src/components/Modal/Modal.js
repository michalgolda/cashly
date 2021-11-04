import PropTypes from "prop-types";
import styled from "styled-components";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

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
    padding: .5rem;
    min-width: 256px;
    max-width: 512px;
    border-radius: 2px;
    background-color: ${({ theme }) => theme.colors.white};
`;

const StyledModalHeader = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const StyledModalBody = styled.div`padding: .5rem 0 .5rem 0;`;

const StyledModalCloseButton = styled.button`
    border: none;
    outline: none;
    cursor: pointer;
    background-color: transparent;
    font-size: ${({ theme }) => theme.font.sizes.h4};
`;

function Modal({ children }) {
    return (
        <StyledWrapper>
            <StyledModal>
                <StyledModalHeader>
                    <StyledModalCloseButton 
                        size="small"
                        variant="primaryOutline" 
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