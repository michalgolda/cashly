import PropTypes from 'prop-types';

import * as S from './Header.styled';

function Header({ children, title, description, ...props }) {
  return (
    <S.Header {...props}>
      <S.Container>
        <S.TextContainer>
          <h1>{title}</h1>
          <S.Description>{description}</S.Description>
        </S.TextContainer>
        {children}
      </S.Container>
    </S.Header>
  );
}

Header.propTypes = {
  rightElement: PropTypes.element,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Header;
