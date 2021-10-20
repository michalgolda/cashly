import styled from "styled-components";

const StyledButton = styled.button`
    transition: .15s;
    background-color: transparent;
    padding: .5rem 1.5rem .5rem 1.5rem;
    color: ${({ theme }) => theme.colors.primary};
    font-family: ${({ theme }) => theme.font.family};
    font-size: ${({ theme }) => theme.font.sizes.h6};
    border: 1px solid ${({ theme }) => theme.colors.primary};
    font-weight: ${({ theme }) => theme.font.weights.semiBold};

    &:hover { 
        cursor: pointer;
        color: ${({ theme }) => theme.colors.secondary};
        background-color: ${({ theme }) => theme.colors.primary};
    }
`;

export default function Button({ children }) {
    return <StyledButton>{children}</StyledButton>;
}