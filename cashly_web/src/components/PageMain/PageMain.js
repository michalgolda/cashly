import PropTypes from "prop-types";
import * as S from "./PageMain.styled";

function PageMain({ children, ...props }) {
  return (
    <S.Wrapper {...props}>
      <S.Main>{children}</S.Main>
    </S.Wrapper>
  );
}

PageMain.propTypes = { children: PropTypes.node };

export default PageMain;
