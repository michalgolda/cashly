import { Informer } from "@/components";
import VoidIllustration from "@/assets/void.svg";
import AddCategoryButton from "@/pages/Categories/AddCategoryButton";

export default function CategoryListEmptyInformer() {
  return (
    <Informer
      bottomElement={<AddCategoryButton />}
      illustrationSource={VoidIllustration}
      illustrationStyles={{ maxWidth: "128px" }}
      text={"Aktualnie lista kategorii wydatków jest pusta"}
    />
  );
}
