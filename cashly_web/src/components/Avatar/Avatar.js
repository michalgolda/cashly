import * as S from "./Avatar.styles";

export default function Avatar({ letter, ...props }) {
  return (
    <S.Container {...props}>
      <S.Letter>{letter}</S.Letter>
    </S.Container>
  );
}
