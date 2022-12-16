import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useFormik } from 'formik';
import * as yup from 'yup';

import { authAPI } from '@/api';
import { Button, Input, LinkButton } from '@/components';
import { notifyUnhandledError } from '@/helpers/notify';
import AuthForm from '@/pages/Auth/AuthForm/AuthForm';

export default function PasswordRecoveryRequestForm() {
  const navigate = useNavigate();

  const notifyPasswordRecoveryRequestSuccess = () =>
    toast.success('Link do resetowania hasła został pomyślnie wysłany');

  const initialValues = { email: '' };
  const validationSchema = yup.object({
    email: yup
      .string()
      .email('Podaj prawidłowy email')
      .required('To pole jest wymagane'),
  });
  const passwordRecoveryRequestMutation = useMutation(
    authAPI.passwordRecoveryRequest,
    {
      onSuccess: () => {
        navigate('/login');
        notifyPasswordRecoveryRequestSuccess();
      },
    },
  );
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { setFieldError }) => {
      passwordRecoveryRequestMutation.mutate(values, {
        onError: (err) => {
          if (err.response && err.response.status === 404) {
            const { code } = err.response.data;
            switch (code) {
              case 'UserNotFoundError':
                setFieldError(
                  'email',
                  'Użytkownik o podanym adresie email nie istnieje',
                );
                break;
              default:
                break;
            }
          } else {
            notifyUnhandledError();
          }
        },
      });
    },
  });

  return (
    <>
      <h2>Resetowanie hasła</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <AuthForm onSubmit={formik.handleSubmit} noValidate>
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
        <LinkButton
          to="/login"
          variant="primaryOutlined"
          type="button"
          fullWidth
        >
          Powrót
        </LinkButton>
      </AuthForm>
    </>
  );
}
