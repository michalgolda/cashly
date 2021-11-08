import styled from "styled-components";

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