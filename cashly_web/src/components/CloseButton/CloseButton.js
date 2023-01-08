import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as S from './CloseButton.styled';

export default function CloseButton({ variant, ...props }) {
  return (
    <S.CloseButton variant={variant} {...props}>
      <FontAwesomeIcon icon={faTimes} />
    </S.CloseButton>
  );
}
