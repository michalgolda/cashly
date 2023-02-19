import PropTypes from 'prop-types'
import { useRef } from 'react'
import { CSSTransition } from 'react-transition-group'

import { CloseButton } from '@/components'

import './Modal.css'
import {
    StyledBody,
    StyledHeader,
    StyledModal,
    StyledWrapper,
} from './Modal.styled'

function Modal({ children, show, onHide, ...props }) {
    const nodeRef = useRef(null)

    return (
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
                        <CloseButton onClick={onHide} />
                    </StyledHeader>
                    <StyledBody>{children}</StyledBody>
                </StyledModal>
            </StyledWrapper>
        </CSSTransition>
    )
}

Modal.propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func,
}

Modal.defaultProps = { show: false }

export default Modal
