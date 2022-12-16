import * as S from './FormError.styled';

export default function FormError({ children, ...props }) {
  return <S.FormError {...props}>{children}</S.FormError>;
}
