import { StyledContainer } from './FormHeader.styled'

export default function FormHeader({ title, description }) {
    return (
        <StyledContainer>
            <h2>{title}</h2>
            <p>{description}</p>
        </StyledContainer>
    )
}
