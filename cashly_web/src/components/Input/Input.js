import styled from "styled-components";
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

const StyledContainer = styled.div`display: table-caption;`;
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

export default function Input(props) {
    const { labelText } = props;
    
    return (
        <StyledContainer>
            {labelText && <StyledLabel data-testid="label">{labelText}</StyledLabel>}
            <StyledInput {...props} data-testid="input" />
        </StyledContainer>
    );
}