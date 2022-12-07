import moment from "moment";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "react-query";
import NiceModal, { useModal, bootstrapDialog } from "@ebay/nice-modal-react";
import { expenseAPI } from "@/api";
import ExpenseModal from "./ExpenseModal/ExpenseModal";
import { notifyUnhandledError } from "@/helpers/notify";

export default NiceModal.create(() => {
  const modal = useModal();

  const queryClient = useQueryClient();
  
  const defaultRealisedDate = moment().format("YYYY-MM-DD");
  
  const notifyAddExpenseSuccess = () =>
    toast.success("Wydatek został pomyślnie dodany");

  const initialValues = {
    amount: 0,
    expenseCategoryId: undefined,
    realisedDate: defaultRealisedDate,
  };
  const createExpenseMutation = useMutation(expenseAPI.createExpense, {
    onSuccess: () => {
      modal.hide();
      notifyAddExpenseSuccess();
      queryClient.invalidateQueries("expenses");
    },
    onError: () =>
      notifyUnhandledError()
  });
  const onSubmit = (values, { resetForm }) => {
    resetForm();
    createExpenseMutation.mutate(values);
  };

  return (
    <ExpenseModal
      {...bootstrapDialog(modal)}
      submitText="Dodaj"
      title="Dodaj wydatek"
      onSubmit={onSubmit}
      initialValues={initialValues}
      description={`
                Lorem ipsum dolor sit amet, 
                consectetur adipiscing elit, 
                sed do eiusmod tempor incididunt.
            `}
    />
  );
});
