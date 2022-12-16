import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import * as yup from 'yup';

import { Button, Input } from '@/components';

import * as S from './CategoryModal.styled';

function CategoryModal({
  title,
  onSubmit,
  submitText,
  description,
  initialValues,
  ...props
}) {
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required('Nazwa kategorii jest wymagana.')
      .max(25, 'Nazwa kategorii może mieć maksymalnie 25 znaków.'),
  });

  const formik = useFormik({
    onSubmit,
    initialValues,
    validationSchema,
    enableReinitialize: true,
  });

  return (
    <S.Modal {...props}>
      <S.TextContainer>
        <h2>{title}</h2>
        <p>{description}</p>
      </S.TextContainer>
      <S.Form onSubmit={formik.handleSubmit}>
        <Input
          type="text"
          name="name"
          labelText="Nazwa"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && formik.errors.name}
          fullWidth
        />
        <S.ColorInput
          type="color"
          name="color"
          labelText="Kolor"
          value={formik.values.color}
          onChange={formik.handleChange}
          error={formik.touched.color && formik.errors.color}
          fullWidth
        />
        <Button type="submit" fullWidth>
          {submitText}
        </Button>
      </S.Form>
    </S.Modal>
  );
}

CategoryModal.propTypes = {
  title: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitText: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  initialValues: PropTypes.shape({
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }).isRequired,
};

export default CategoryModal;
