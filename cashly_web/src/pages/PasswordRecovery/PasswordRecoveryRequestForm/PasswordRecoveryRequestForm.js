import * as yup from "yup";
import { useState } from "react";
import { useFormik } from "formik";
import { useMutation } from "react-query";
import { authAPI } from "@/api";
import AuthForm from "@/pages/Auth/AuthForm/AuthForm";
import { Input, Button, LinkButton } from "@/components";
import PasswordRecoverySuccessMessage from "../PasswordRecoverySuccessMessage/PasswordRecoverySuccessMessage";

export default function PasswordRecoveryRequestForm() {
  const [nonFieldError, setNonFieldError] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const initialValues = { email: "" };
  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Podaj prawidłowy email")
      .required("To pole jest wymagane"),
  });
  const passwordRecoveryRequestMutation = useMutation(authAPI.passwordRecoveryRequest, {
    onSuccess: () => setShowSuccessMessage(true),
  });
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { setFieldError }) => {
      passwordRecoveryRequestMutation.mutate(values, { 
        onError: (err) => {
          if (err.response && err.response.status === 404) {
            const { code } = err.response.data;
            switch (code) {
              case "UserNotFoundError":
                setFieldError("email", "Użytkownik o podanym adresie email nie istnieje");
                break;
              default:
                break;
            }
          } else {
            setNonFieldError("Coś poszło nie tak. Spróbuj ponownie.");
          }
        }
       });
    },
  });

  return (
    <>
        {!showSuccessMessage && (
            <>
                <h2>Resetowanie hasła</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <AuthForm
                    onSubmit={formik.handleSubmit}
                    onChange={() => setNonFieldError(null)}
                    nonFieldError={nonFieldError}
                    noValidate
                >
                    <Input
                        type="email"
                        name="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        error={formik.touched.email && formik.errors.email}
                        labelText="E-mail"
                        fullWidth
                    />
                    <Button type="submit">Wyślij link</Button>
                    <LinkButton to="/login" variant="primaryOutlined" type="button" fullWidth>
                    Powrót
                    </LinkButton>
                </AuthForm>
            </>
        )}
        {showSuccessMessage && (
            <PasswordRecoverySuccessMessage
                title="Link został pomyślnie wysłany." 
                content={
                    `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua.`
                }
            >
              <LinkButton variant="primaryOutlined" to="/">OK</LinkButton>
            </PasswordRecoverySuccessMessage>
        )}
    </>
  )
}
