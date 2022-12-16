import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useFormik } from 'formik';
import * as yup from 'yup';

import { authAPI } from '@/api';
import { Button, Input, LinkButton } from '@/components';
import { notifyUnhandledError } from '@/helpers/notify';
import AuthForm from '@/pages/Auth/AuthForm/AuthForm';

import { usePasswordRecovery } from '../usePasswordRecovery';

export default function ResetPasswordForm() {
  const navigate = useNavigate();

  const { passwordRecoveryToken } = usePasswordRecovery();

  const notifyPasswordRecoveryProceedSuccess = () =>
    toast.success('Hasło zostało pomyślnie zmienione');

  const initialValues = {
    password: '',
    confirmPassword: '',
  };
  const validationSchema = yup.object({
    password: yup.string().required('To pole jest wymagane'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Hasła nie są zgodne')
      .required('To pole jest wymagane'),
  });
  const passwordRecoveryProceedMutation = useMutation(
    authAPI.passwordRecoveryProceed,
    {
      onSuccess: () => {
        navigate('/login');
        notifyPasswordRecoveryProceedSuccess();
      },
      onError: () => notifyUnhandledError(),
    },
  );
  const onSubmit = ({ password }) =>
    passwordRecoveryProceedMutation.mutate({
      password,
      passwordRecoveryToken,
    });
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
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
          error={
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
          fullWidth
        />
        <Button type="submit">Zresetuj hasło</Button>
        <LinkButton variant="primaryOutlined" to="/login" fullWidth>
          Powrót
        </LinkButton>
      </AuthForm>
    </>
  );
}
