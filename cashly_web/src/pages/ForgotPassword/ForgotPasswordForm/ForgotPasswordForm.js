import * as yup from "yup";
import { useState } from "react";
import { useFormik } from "formik";
import { useMutation } from "react-query";
import { authAPI } from "@/api";
import { Input, Button, LinkButton } from "@/components";
import * as S from "./ForgotPasswordForm.styled";
import { useForgotPassword } from "../useForgotPassword";

export default function ForgotPasswordForm() {
  const { setResetLinkIsSent } = useForgotPassword();

  const [nonFieldError, setNonFieldError] = useState(null);

  const initialValues = { email: "" };

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Podaj prawidłowy email")
      .required("To pole jest wymagane"),
  });

  const forgotPasswordMutation = useMutation(authAPI.forgotPassword, {
    onSuccess: () => setResetLinkIsSent(true),
    onError: (error) => {
      console.log(error);
    },
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      forgotPasswordMutation.mutate(values);
    },
  });

  return (
    <S.Form
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
    </S.Form>
  );
}
