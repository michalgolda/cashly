import PropTypes from "prop-types";
import * as S from "./Input.styled";

function Input({ className, fullWidth, labelText, error, ...props }) {
  return (
    <S.Wrapper fullWidth={fullWidth}>
      {labelText && <S.Label className="inputLabel">{labelText}</S.Label>}
      <S.Input className={className} isError={Boolean(error)} {...props} />
      {error && <S.Error>{error}</S.Error>}
    </S.Wrapper>
  );
}

Input.propTypes = {
  error: PropTypes.string,
  fullWidth: PropTypes.bool,
  labelText: PropTypes.string,
};

Input.defaultProps = { fullWidth: false };

export default Input;
