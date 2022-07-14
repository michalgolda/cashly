import styled from "styled-components";
import { NonFieldError } from "../../../components";

const StyledForm = styled.form`
  width: 100%;
  display: grid;
  row-gap: 1rem;
  margin: 16px auto;
`;

export default function AuthForm(props) {
  const { children, nonFieldError } = props;

  return (
    <StyledForm {...props}>
      {nonFieldError && <NonFieldError message={nonFieldError} />}
      {children}
    </StyledForm>
  );
}
