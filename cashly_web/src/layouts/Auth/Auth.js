import * as S from "./Auth.styled";

export default function AuthLayout({ children, ...props }) {
  return (
    <S.Container {...props}>
      <S.Wrapper>
        <S.Logo />
        {children}
      </S.Wrapper>
    </S.Container>
  );
}
