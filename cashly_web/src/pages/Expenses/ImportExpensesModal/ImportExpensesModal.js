import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "react-query";
import NiceModal, { useModal, bootstrapDialog } from "@ebay/nice-modal-react";
import { expenseAPI } from "@/api";
import { Input, Button } from "@/components";
import * as S from "./ImportExpensesModal.styled";
import { notifyUnhandledError } from "@/helpers/notify";

export default NiceModal.create(() => {
  const modal = useModal();

  const queryClient = useQueryClient();

  const notifyImportExpensesSuccess = () =>
    toast.success("Wydatki zostały pomyślnie zaimportowane");

  const importExpensesMutation = useMutation(expenseAPI.importExpenses, {
    onSuccess: () => {
      modal.hide();
      notifyImportExpensesSuccess();
      queryClient.invalidateQueries("expenses");
    },
    onError: () =>
      notifyUnhandledError()
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const file = formData.get("file");

    importExpensesMutation.mutate({ file });
  };

  return (
    <S.Modal {...bootstrapDialog(modal)}>
      <S.TextContainer>
        <h2>Importuj wydatki</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt.
        </p>
      </S.TextContainer>
      <S.Form onSubmit={handleSubmit}>
        <Input name="file" type="file" labelText="Plik" fullWidth />
        <Button fullWidth>Importuj</Button>
      </S.Form>
    </S.Modal>
  );
});
