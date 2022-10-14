import * as yup from "yup";
import { useFormik } from "formik";
import { useMutation } from "react-query";
import * as S from "./ResetPasswordForm.styled";
import { Input, Button } from "@/components";
import { authAPI } from "@/api";

export default function ResetPasswordForm() {
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

  const resetPasswordMutation = useMutation(authAPI.resetPassword);

  const onSubmit = ({ password }) => {
    resetPasswordMutation.mutate({ password, token: "123" });
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <S.Form onSubmit={formik.handleSubmit} noValidate>
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
    </S.Form>
  );
}
