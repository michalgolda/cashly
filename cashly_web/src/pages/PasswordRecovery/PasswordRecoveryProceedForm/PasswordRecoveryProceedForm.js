import { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { useMutation } from "react-query";
import { authAPI } from "@/api";
import AuthForm from "@/pages/Auth/AuthForm/AuthForm";
import { Input, Button, LinkButton } from "@/components";
import PasswordRecoverySuccessMessage from "../PasswordRecoverySuccessMessage/PasswordRecoverySuccessMessage";
import { usePasswordRecovery } from "../usePasswordRecovery";

export default function ResetPasswordForm() {
  const { passwordRecoveryToken } = usePasswordRecovery();
  const [nonFieldError, setNonFieldError] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const initialValues = {
    password: "",
    confirmPassword: "",
  };
  const validationSchema = yup.object({
    password: yup.string().required("To pole jest wymagane"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Hasła nie są zgodne")
      .required("To pole jest wymagane"),
  });
  const passwordRecoveryProceedMutation = useMutation(authAPI.passwordRecoveryProceed, {
    onSuccess: () => setShowSuccessMessage(true)
  });
  const onSubmit = ({ password }) => {
    passwordRecoveryProceedMutation.mutate({ password, passwordRecoveryToken }, {
      onError: () =>
          setNonFieldError("Coś poszło nie tak. Spróbuj ponownie.")
    });
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
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
                    name="password"
                    labelText="Nowe hasło"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    error={formik.touched.password && formik.errors.password}
                    fullWidth
                />
                <Input
                    name="confirmPassword"
                    labelText="Powtórz hasło"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                    error={formik.touched.confirmPassword && formik.errors.confirmPassword}
                    fullWidth
                />
                <Button type="submit">Zresetuj hasło</Button>
            </AuthForm>
        </>
      )}
      {showSuccessMessage && (
        <PasswordRecoverySuccessMessage
          title="Hasło zostało pomyślnie zmienione."
          content={
            `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.`
          }
        >
          <LinkButton variant="primaryOutlined" to="/login">OK</LinkButton>
        </PasswordRecoverySuccessMessage>
      )}
    </>
  );
}
