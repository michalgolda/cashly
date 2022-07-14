import styled from "styled-components"

const StyledForm = styled.form`
    width: 100%;    
    display: grid;
	row-gap: 1rem;
	margin: 16px auto;
`;

export default function AuthForm(props) {
    const { children } = props;
    
    return (
        <StyledForm {...props}>
            {children}
        </StyledForm>
    )
}