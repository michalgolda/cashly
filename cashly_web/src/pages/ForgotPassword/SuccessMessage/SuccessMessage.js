import { faCheck } from "@fortawesome/free-solid-svg-icons";
import * as S from "./SuccessMessage.styled";

export default function SuccessMessage({ title, content, children }) {
  return (
    <S.Container>
      <S.MessageIconWrapper>
        <S.MessageIcon icon={faCheck} />
      </S.MessageIconWrapper>
      <div>
        <h2>{title}</h2>
        <p>{content}</p>
      </div>
      {children}
    </S.Container>
  );
}
