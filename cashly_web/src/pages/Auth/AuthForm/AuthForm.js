import * as S from "./AuthForm.styles";
import { NonFieldError } from "@/components";

export default function AuthForm({ children, nonFieldError, ...props }) {
  return (
    <S.Form {...props}>
      {nonFieldError && <NonFieldError message={nonFieldError} />}
      {children}
    </S.Form>
  );
}
