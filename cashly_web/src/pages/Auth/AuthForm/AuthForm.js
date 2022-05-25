import styled from "styled-components"

const StyledForm = styled.form`
    width: 100%;    
    display: grid;
	row-gap: 1rem;
	margin: 16px auto;
`;

export default function AuthForm({ children }) {
    return (
        <StyledForm>
            {children}
        </StyledForm>
    )
}