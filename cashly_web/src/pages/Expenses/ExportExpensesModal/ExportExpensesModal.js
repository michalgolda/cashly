import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import NiceModal, { useModal, bootstrapDialog } from "@ebay/nice-modal-react";
import { expenseAPI } from "@/api";
import { Input, Button } from "@/components";
import * as S from "./ExportExpensesModal.styled";
import { notifyUnhandledError } from "@/helpers/notify";

export default NiceModal.create(() => {
  const modal = useModal();

  const notifyExportExpensesSuccess = () =>
    toast.success("Wydatki zostały pomyślnie wyeksportowane");

  const exportExpensesMutation = useMutation(expenseAPI.exportExpenses, {
    onSuccess: ({ data }) => {
      modal.hide();
      notifyExportExpensesSuccess();

      const blob = new Blob([data], { type: "text/csv" });
      const blobUrl = URL.createObjectURL(blob);
      window.open(blobUrl);
    },
    onError: () =>
      notifyUnhandledError()
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
