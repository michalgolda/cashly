import { faCheck } from "@fortawesome/free-solid-svg-icons";
import * as S from "./PasswordRecoverySuccessMessage.styled";

export default function PasswordRecoverySuccessMessage({ title, content, children }) {
  return (
    <S.Container>
      <S.MessageIconWrapper>
        <S.MessageIcon icon={faCheck} />
      </S.MessageIconWrapper>
      <div>
        <h2>{title}</h2>
        <p>{content}</p>
        <S.ChildrenWrapper>
          {children}
        </S.ChildrenWrapper>
      </div>
    </S.Container>
  );
}
