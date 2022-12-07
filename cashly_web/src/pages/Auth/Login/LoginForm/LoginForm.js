import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { Input, Button } from "@/components";
import AuthForm from "../../AuthForm/AuthForm";
import { useSession } from "@/hooks/useSession";
import { notifyUnhandledError } from "@/helpers/notify";

export default function LoginForm() {
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

  const { login } = useSession();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) =>
      login(values).catch(() => notifyUnhandledError()),
  });

  return (
    <AuthForm
      onSubmit={formik.handleSubmit}
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
