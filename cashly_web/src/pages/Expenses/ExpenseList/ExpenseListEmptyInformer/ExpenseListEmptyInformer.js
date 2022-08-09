import * as S from "./ExpenseListEmptyInformer.styles";
import { Informer } from "@/components";
import VoidIllustration from "@/assets/void.svg";
import AddExpenseButton from "../../AddExpenseButton/AddExpenseButton";
import ImportExpenseButton from "../../ImportExpensesButton/ImportExpensesButton";

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
