import PropTypes from "prop-types";
import styled, { css } from "styled-components";


const StyledBaseButton = styled.button`
    border: none;
    outline: none;
    cursor: pointer;
    line-height: 1.5;
    padding: 6px 16px;
    position: relative;
    border-radius: 2px;
    align-items: center;
    display: inline-flex;
    min-width: max-content;
    justify-content: center;
    font-size: ${({ theme }) => theme.fontSizes.h5};
    font-family: ${({ theme }) => theme.fontFamily};
    transition: ${({ theme }) => theme.defaultTransition};
    font-weight: ${({ theme }) => theme.fontWeights.regular};

    &:hover { background-color: ${({ theme }) => theme.colors.primary500}; }
    &:active { background-color: ${({ theme }) => theme.colors.primary300}; }

    ${({ fullWidth }) => fullWidth && css`width: 100%;`};
`;

const StyledPrimaryButton = styled(StyledBaseButton)`
    color: white;
    background-color: ${({ theme }) => theme.colors.primary400};
`;

const StyledPrimaryOutlined = styled(StyledBaseButton)`
    padding: 5px 15px;
    background-color: transparent;
    border: 1px solid ${({ theme }) => theme.colors.primary400};

    &:hover { color: white; }
`;

const StyledTextButton = styled(StyledBaseButton)`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.primary400};

    &:hover { background-color: ${({ theme }) => theme.colors.gray100}; }
    &:active { background-color: ${({ theme }) => theme.colors.gray300}; }
`;

const StyledBaseIconWrapper = styled.span`display: inherit;`;

const StyledStartIconWrapper = styled(StyledBaseIconWrapper)`margin-right: 16px;`;

const StyledEndIconWrapper = styled(StyledBaseIconWrapper)`margin-left: 16px;`;

const mappedButtonVariants = {
    "text": StyledTextButton,
    "primary": StyledPrimaryButton,
    "primaryOutlined": StyledPrimaryOutlined
};

function Button(props) {
    const { children, variant, startIcon, endIcon } = props;
    const ButtonVariant = mappedButtonVariants[variant];

    return (
        <ButtonVariant {...props}>
            {startIcon && (
                <StyledStartIconWrapper>
                    {startIcon}
                </StyledStartIconWrapper>
            )}
            {children}
            {endIcon && (
                <StyledEndIconWrapper>
                    {endIcon}
                </StyledEndIconWrapper>
            )}
        </ButtonVariant>
    );
}

Button.propTypes = {
    children: PropTypes.node,
    fullWidth: PropTypes.bool,
    endIcon: PropTypes.element,
    startIcon: PropTypes.element,
    variant: PropTypes.oneOf([
        "text",
        "primary", 
        "primaryOutlined"
    ])
};

Button.defaultProps = {
    fullWidth: false,
    variant: "primary"
};

export default Button;