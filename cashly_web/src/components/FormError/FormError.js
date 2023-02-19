import { StyledFormError } from './FormError.styled'

export default function FormError({ children, ...props }) {
    return <StyledFormError {...props}>{children}</StyledFormError>
}
