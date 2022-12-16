import { faTrash } from '@fortawesome/free-solid-svg-icons';

import * as S from './DeleteListItemButton.styled';

export default function DeleteListItemButton(props) {
  return <S.ActionButton icon={faTrash} {...props} />;
}
