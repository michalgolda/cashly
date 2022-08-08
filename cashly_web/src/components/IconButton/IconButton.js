import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as S from "./IconButton.styles";

export default function IconButton({ icon, ...props }) {
  return (
    <S.IconButton {...props}>
      <FontAwesomeIcon icon={icon} />
    </S.IconButton>
  );
}
