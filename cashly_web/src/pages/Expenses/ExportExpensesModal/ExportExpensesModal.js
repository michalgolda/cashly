import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

import NiceModal, { bootstrapDialog, useModal } from '@ebay/nice-modal-react';
import { saveAs } from 'file-saver';
import { useFormik } from 'formik';

import { expenseAPI } from '@/api';
import { Button, Input } from '@/components';
import { defaultDateTimeFormat } from '@/helpers/formating';
import { notifyUnhandledError } from '@/helpers/notify';

import * as S from './ExportExpensesModal.styled';

export default NiceModal.create(() => {
  const modal = useModal();

  const notifyExportExpensesSuccess = () =>
    toast.success('Wydatki zostały pomyślnie wyeksportowane');

  const exportExpensesMutation = useMutation(expenseAPI.exportExpenses, {
    onSuccess: ({ data }) => {
      modal.hide();
      notifyExportExpensesSuccess();

      const blob = new Blob([data], { type: 'text/csv' });
      saveAs(blob, `Wydatki - ${defaultDateTimeFormat.format(new Date())}`);
    },
    onError: () => notifyUnhandledError(),
  });

  const onSubmit = (values) => exportExpensesMutation.mutate(values);
  const initialValues = { fileFormat: 'CSV' };
  const { values, handleChange, handleSubmit } = useFormik({
    onSubmit,
    initialValues,
  });

  return (
    <S.Modal {...bootstrapDialog(modal)}>
      <S.TextContainer>
        <h2>Eksportuj wydatki</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt.
        </p>
      </S.TextContainer>
      <S.Form onSubmit={handleSubmit}>
        <Input
          as="select"
          name="fileFormat"
          onChange={handleChange}
          labelText="Format pliku"
          value={values.fileFormat}
          fullWidth
        >
          <option value="CSV">CSV</option>
        </Input>
        <Button fullWidth>Eksportuj</Button>
      </S.Form>
    </S.Modal>
  );
});
