import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as S from "./Button.styled";

function Button({ children, variant, startIcon, endIcon, ...props }) {
  const ButtonVariant = {
    text: S.TextButton,
    primary: S.PrimaryButton,
    primaryOutlined: S.PrimaryOutlinedButton,
  }[variant];

  return (
    <ButtonVariant {...props}>
      {startIcon && (
        <S.StartIconWrapper>
          <FontAwesomeIcon icon={startIcon} />
        </S.StartIconWrapper>
      )}
      {children}
      {endIcon && (
        <S.EndIconWrapper>
          <FontAwesomeIcon icon={endIcon} />
        </S.EndIconWrapper>
      )}
    </ButtonVariant>
  );
}

Button.defaultProps = {
  fullWidth: false,
  variant: "primary",
};

export default Button;
