import * as S from "./ExpenseListEmptyInformer.styled";
import { Informer } from "@/components";
import VoidIllustration from "@/assets/void.svg";
import AddExpenseButton from "@/pages/Expenses/AddExpenseButton";
import ImportExpenseButton from "@/pages/Expenses/ImportExpensesButton";

export default function ExpenseListEmptyInformer() {
  return (
    <Informer
      bottomElement={
        <S.ButtonContainer>
          <AddExpenseButton />
          <ImportExpenseButton />
        </S.ButtonContainer>
      }
      illustrationSource={VoidIllustration}
      illustrationStyles={{ maxWidth: "128px" }}
      text={"Aktualnie lista wydatków jest pusta"}
    />
  );
}
