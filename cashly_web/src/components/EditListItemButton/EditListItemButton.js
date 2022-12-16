import { faEdit } from '@fortawesome/free-solid-svg-icons';

import * as S from './EditListItemButton.styled';

export default function EditListItemButton(props) {
  return <S.ActionButton icon={faEdit} {...props} />;
}
