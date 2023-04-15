import PropTypes from 'prop-types'
import { useRef } from 'react'
import { CSSTransition } from 'react-transition-group'

import CloseButton from '@/components/CloseButton/CloseButton'

import {
    StyledBody,
    StyledCSSTransitionWrapper,
    StyledHeader,
    StyledModal,
    StyledWrapper,
} from './Modal.styled'

function Modal({ children, show, onHide, ...props }) {
    const nodeRef = useRef(null)

    return (
        <StyledCSSTransitionWrapper data-testid="modal-component">
            <CSSTransition
                nodeRef={nodeRef}
                in={show}
                timeout={300}
                classNames="modal"
                unmountOnExit
            >
                <StyledWrapper ref={nodeRef}>
                    <StyledModal {...props}>
                        <StyledHeader>
                            <CloseButton variant="dark" onClick={onHide} />
                        </StyledHeader>
                        <StyledBody>{children}</StyledBody>
                    </StyledModal>
                </StyledWrapper>
            </CSSTransition>
        </StyledCSSTransitionWrapper>
    )
}

Modal.propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func,
}

Modal.defaultProps = { show: false }

export default Modal
