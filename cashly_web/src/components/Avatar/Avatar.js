import * as S from './Avatar.styled';

export default function Avatar({ letter, ...props }) {
  return (
    <S.Container {...props}>
      <S.Letter>{letter}</S.Letter>
    </S.Container>
  );
}
