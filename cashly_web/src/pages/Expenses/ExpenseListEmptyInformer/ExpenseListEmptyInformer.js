import { Informer } from "../../../components";
import VoidIllustration from "../../../assets/void.svg";
import AddExpenseButton from "../AddExpenseButton/AddExpenseButton";


export default function CategoryListEmptyInformer() {
    return (
        <Informer
            bottomElement={<AddExpenseButton />}
            illustrationSource={VoidIllustration}
            illustrationStyles={{maxWidth: "128px"}}
            text={"Aktualnie lista wydatków jest pusta"} 
        />
    );
}