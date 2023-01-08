import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import PropTypes from 'prop-types';

import { CloseButton } from '@/components';

import './Modal.css';
import * as S from './Modal.styled';

function Modal({ children, show, onHide, ...props }) {
  const nodeRef = useRef(null);

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={show}
      timeout={300}
      classNames="modal"
      unmountOnExit
    >
      <S.Wrapper ref={nodeRef}>
        <S.Modal {...props}>
          <S.Header>
            <CloseButton onClick={onHide} />
          </S.Header>
          <S.Body>{children}</S.Body>
        </S.Modal>
      </S.Wrapper>
    </CSSTransition>
  );
}

Modal.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  children: PropTypes.node,
};

Modal.defaultProps = { show: false };

export default Modal;
