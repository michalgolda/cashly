import * as yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";

import AuthForm from "../../AuthForm/AuthForm";
import { useAuth } from "@/hooks/auth";
import { Input, Button } from "@/components";

export default function LoginForm() {
  const [nonFieldError, setNonFieldError] = useState(null);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Podaj prawidłowy email")
      .required("To pole jest wymagane"),
    password: yup.string().required("To pole jest wymagane"),
  });

  const { login } = useAuth();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) =>
      login(values).catch((err) => {
        if (err.response && err.response.status === 400) {
          const { message } = err.response.data;
          setNonFieldError(message);
        } else {
          setNonFieldError("Coś poszło nie tak. Spróbuj ponownie.");
        }
      }),
  });

  return (
    <AuthForm
      onSubmit={formik.handleSubmit}
      onChange={() => setNonFieldError(null)}
      nonFieldError={nonFieldError}
      noValidate
    >
      <Input
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
        error={formik.touched.email && formik.errors.email}
        labelText="E-Mail"
        fullWidth
      />
      <Input
        name="password"
        type="password"
        onChange={formik.handleChange}
        value={formik.values.password}
        error={formik.touched.password && formik.errors.password}
        labelText="Hasło"
        fullWidth
      />
      <Button type="submit" fullWidth>
        Zaloguj się
      </Button>
    </AuthForm>
  );
}
