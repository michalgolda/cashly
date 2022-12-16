import { toast } from 'react-toastify';

import { useFormik } from 'formik';
import * as yup from 'yup';

import { Button, Input } from '@/components';
import { notifyUnhandledError } from '@/helpers/notify';
import { useSession } from '@/hooks/useSession';

import AuthForm from '../../AuthForm/AuthForm';

export default function LoginForm() {
  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .email('Podaj prawidłowy email')
      .required('To pole jest wymagane'),
    password: yup.string().required('To pole jest wymagane'),
  });

  const { login } = useSession();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) =>
      login(values).catch(({ response }) => {
        if (response) {
          const { code, message } = response.data;
          switch (code) {
            case 'BadAuthenticationCredentialsError':
              toast.warning(message);
              break;
            default:
              notifyUnhandledError();
          }
        } else {
          notifyUnhandledError();
        }
      }),
  });

  return (
    <AuthForm onSubmit={formik.handleSubmit} noValidate>
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
