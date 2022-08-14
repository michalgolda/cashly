import * as S from "./NonFieldError.styled";

function NonFieldError({ message, ...props }) {
  return <S.Message {...props}>{message}</S.Message>;
}

export default NonFieldError;
