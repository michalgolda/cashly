import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

import * as S from './Modal.styled';

function Modal({ children, show, onHide, ...props }) {
  return (
    show && (
      <S.Wrapper>
        <S.Modal {...props}>
          <S.Header>
            <S.HideButton onClick={onHide}>
              <FontAwesomeIcon icon={faTimes} />
            </S.HideButton>
          </S.Header>
          <S.Body>{children}</S.Body>
        </S.Modal>
      </S.Wrapper>
    )
  );
}

Modal.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  children: PropTypes.node,
};

Modal.defaultProps = { show: false };

export default Modal;
