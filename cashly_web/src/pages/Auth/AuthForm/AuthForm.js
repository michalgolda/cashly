import * as S from "./AuthForm.styled";
import { FormError } from "@/components";

export default function AuthForm({ children, nonFieldError, ...props }) {
  return (
    <S.Form {...props}>
      {nonFieldError && <FormError>{nonFieldError}</FormError>}
      {children}
    </S.Form>
  );
}
