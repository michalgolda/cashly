import { useFormik } from "formik";
import { useMutation } from "react-query";
import NiceModal, { useModal, bootstrapDialog } from "@ebay/nice-modal-react";
import * as S from "./ExportExpensesModal.styles";
import { expenseAPI } from "@/api";
import { Input, Button } from "@/components";

export default NiceModal.create(() => {
  const modal = useModal();

  const exportExpensesMutation = useMutation(expenseAPI.exportExpenses, {
    onSuccess: ({ data }) => {
      modal.hide();

      const blob = new Blob([data], { type: "text/csv" });
      const blobUrl = URL.createObjectURL(blob);
      window.open(blobUrl);
    },
  });

  const onSubmit = (values) => exportExpensesMutation.mutate(values);
  const initialValues = { fileFormat: "CSV" };
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
