import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { authAPI } from "@/api";
import { Input, Button } from "@/components";
import AuthForm from "../../AuthForm/AuthForm";
import { notifyUnhandledError } from "@/helpers/notify";

export default function RegisterForm() {
  const navigate = useNavigate();

  const notifyRegisterSuccess = () =>
    toast.success("Konto zostało pomyślnie zarejestrowane");

  const registerMutation = useMutation(authAPI.register, {
    onSuccess: () => {
      notifyRegisterSuccess();
      navigate("/login", { replace: true });
    },
  });

  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Podaj prawidłowy email")
      .required("To pole jest wymagane"),
    password: yup.string().required("To pole jest wymagane"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Hasła nie są zgodne")
      .required("To pole jest wymagane"),
  });

  const onSubmit = (values, { setFieldError }) => {
    delete values["confirmPassword"];

    registerMutation.mutate(values, {
      onError: (err) => {
        if (err.response && err.response.status === 400) {
          const { code, message } = err.response.data;
          switch (code) {
            case "UserEmailAlreadyUsedError":
              setFieldError("email", message);
              break;
            default:
              break;
          }
        } else {
          notifyUnhandledError();
        }
      },
    });
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
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
      <Input
        name="confirmPassword"
        type="password"
        onChange={formik.handleChange}
        value={formik.values.confirmPassword}
        error={formik.touched.confirmPassword && formik.errors.confirmPassword}
        labelText="Powtórz hasło"
        fullWidth
      />
      <Button type="submit" fullWidth>
        Zarejestruj się
      </Button>
    </AuthForm>
  );
}
