import LogoSVG from '@/assets/logo.svg';

import * as S from './Logo.styled';

export default function Logo(props) {
  return (
    <S.Wrapper>
      <img src={LogoSVG} width={190} {...props} />
    </S.Wrapper>
  );
}
