import PropTypes from "prop-types";
import styled, { css } from "styled-components";

const buttonStyleSizes = {
    small: css`font-size: ${({ theme }) => theme.font.sizes.h6};`,
    medium: css`font-size: ${({ theme }) => theme.font.sizes.h5};`,
    large: css`font-size: ${({ theme }) => theme.font.sizes.h4};`
};

const buttonStyleVariants = {
    primary: css`
        color: ${({ theme }) => theme.colors.white};
        background-color: ${({ theme }) => theme.colors.primary400};

        &:hover { background-color: ${({ theme }) => theme.colors.primary500}; }
        
        &:active { background-color: ${({ theme }) => theme.colors.primary300}; }
    `,
    primaryOutline: css`
        color: ${({ theme }) => theme.colors.primary400};
        background-color: ${({ theme }) => theme.colors.white};
        border: 2px solid ${({ theme }) => theme.colors.primary400};

        &:hover { 
            color: ${({ theme }) => theme.colors.white};
            background-color: ${({ theme }) => theme.colors.primary500}; 
        }

        &:active {
            color: ${({ theme }) => theme.colors.white};
            background-color: ${({ theme }) => theme.colors.primary300};
        }
    `
};

const StyledButton = styled.button`
    border: none;
    outline: none;
    display: block;
    cursor: pointer;
    transition: .15s;
    border-radius: 2px;
    display: inline-block;
    padding: .5rem 1.5rem .5rem 1.5rem;
    font-family: ${({ theme }) => theme.font.family};
    font-weight: ${({ theme }) => theme.font.weights.semiBold};

    
    ${({ size }) => buttonStyleSizes[size]};
    ${({ variant }) => buttonStyleVariants[variant]};

    ${({ fullWidth }) => fullWidth && css`width: 100%;`};
    ${({ as }) => as === "a" && css`text-align: center; text-decoration: none;`};
`;

function Button(props) {
    const { children, variant, size, as } = props;

    return (
        <StyledButton
            as={as}
            size={size} 
            variant={variant}
            {...props}
        >
            {children}
        </StyledButton>
    );
}

Button.defaultProps = {
    as: "button",
    size: "medium",
    fullWidth: false,
    variant: "primary" 
};

Button.propTypes = {
    fullWidth: PropTypes.bool,
    children: PropTypes.node.isRequired,
    as: PropTypes.oneOf(["button", "a"]),
    size: PropTypes.oneOf(["small", "medium", "large"]),
    variant: PropTypes.oneOf(["primary", "primaryOutline"])
};

export default Button;