import PropTypes from "prop-types";
import * as S from "./Widget.styled";

function Widget({ className, children, title, centerContent }) {
  return (
    <S.Widget className={className}>
      {title && (
        <S.Header>
          <S.Title>{title}</S.Title>
        </S.Header>
      )}
      <S.Body centerContent>{children}</S.Body>
    </S.Widget>
  );
}

Widget.propTypes = {
  centerContent: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

Widget.defaultProps = { centerContent: true };

export default Widget;
