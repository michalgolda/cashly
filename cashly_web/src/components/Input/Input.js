import PropTypes from "prop-types";
import styled, { css } from "styled-components";


const inputStyleTypes = {
    color: css`
        padding: 0;
        width: 100%;
        height: 46px;
        cursor: pointer;

        &::-webkit-color-swatch { border: none; }
        &::-webkit-color-swatch-wrapper { padding: 0; }
    `
};

const StyledContainer = styled.div`display: grid;`;

const StyledLabel = styled.label`
    width: fit-content;
    height: min-content;
    padding: .5rem 1rem .5rem 1rem;
    color: ${({ theme }) => theme.colors.white};
    font-size: ${({ theme }) => theme.font.sizes.h6};
    font-weight: ${({ theme }) => theme.font.weights.semiBold};
    background-color: ${({ theme }) => theme.colors.primary400};
`;

const StyledInput = styled.input`
    outline: none;
    border-radius: 2px;
    padding: .5rem 1rem .5rem 1rem;
    font-size: ${({ theme }) => theme.font.sizes.h5};
    font-family: ${({ theme }) => theme.font.family};
    font-weight: ${({ theme }) => theme.font.weights.semiBold};
    border: 2px solid ${({ theme }) => theme.colors.primary400};

    ${({ type }) => inputStyleTypes[type]};
`;

const StyledErrorText = styled.p`
    padding: .5rem;
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.red300};
    font-weight: ${({ theme }) => theme.font.weights.semiBold};
`;

function Input(props) {
    const { labelText, errorText } = props;
    
    return (
        <StyledContainer>
            {labelText && <StyledLabel data-testid="label">{labelText}</StyledLabel>}
            <StyledInput {...props} data-testid="input" />
            {errorText && <StyledErrorText>{errorText}</StyledErrorText>}
        </StyledContainer>
    );
}

Input.propTypes = {
    labelText: PropTypes.string,
    errorText: PropTypes.string
};

export default Input;