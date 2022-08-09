import PropTypes from "prop-types";
import * as S from "./Header.styles";

function Header({ title, description, rightElement, ...props }) {
  return (
    <S.Header {...props}>
      <S.Wrapper>
        <S.LeftContentWrapper>
          {title && <h1>{title}</h1>}
          {description && <S.Description>{description}</S.Description>}
        </S.LeftContentWrapper>
        {rightElement && (
          <S.RightContentWrapper>{rightElement}</S.RightContentWrapper>
        )}
      </S.Wrapper>
    </S.Header>
  );
}

Header.propTypes = {
  description: PropTypes.string,
  rightElement: PropTypes.element,
  title: PropTypes.string.isRequired,
};

export default Header;
