import PropTypes from "prop-types";
import styled from "styled-components";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const StyledWrapper = styled.div`
    top: 0;
    width: 100%;
    z-index: 999;
    height: 100vh;
    display: flex;
    position: fixed;
    align-items: center;
    justify-content: center;
    background-color: rgb(47, 50, 55, .75);
`;

const StyledModal = styled.div`
    width: 100%;
    height: auto;
    max-width: 512px;
    border-radius: 2px;
    background-color: white;
    margin: -128px 32px 32px 32px;
    border: 1px solid ${({ theme }) => theme.colors.gray400};
`;

const StyledModalHeader = styled.div`
    padding: 15px;
    display: flex;
    justify-content: right;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray400};
`;

const StyledHideModalButton = styled.span`
    border: none;
    outline: none;
    cursor: pointer;
    display: inherit;
    user-select: none;
    background-color: transparent;
    font-size: ${({ theme }) => theme.fontSizes.h4};
    transition: ${({ theme }) => theme.defaultTransition};

    &:hover { color: ${({ theme }) => theme.colors.primary500}; }
    &:active { color: ${({ theme }) => theme.colors.primary300}; }
`;

const StyledModalBody = styled.div`padding: 15px;`;

function Modal({ className, children, show, onHide }) {
    return show && (
        <StyledWrapper>
            <StyledModal className={className}>
                <StyledModalHeader>
                    <StyledHideModalButton onClick={onHide}>
                        <FontAwesomeIcon icon={faTimes} />
                    </StyledHideModalButton>
                </StyledModalHeader>
                <StyledModalBody>{children}</StyledModalBody>
            </StyledModal>
        </StyledWrapper>
    );
}

Modal.propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func,
    children: PropTypes.node
};

Modal.defaultProps = { show: false };

export default Modal;