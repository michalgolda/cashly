import * as S from "./NonFieldError.styles";

function NonFieldError({ message, ...props }) {
  return <S.Message {...props}>{message}</S.Message>;
}

export default NonFieldError;
