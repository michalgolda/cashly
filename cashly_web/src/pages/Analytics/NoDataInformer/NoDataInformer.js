import { Informer } from "../../../components";
import VoidIllustration from "../../../assets/void.svg";


export default function NoDataInformer() {
    return (
        <Informer
            illustrationSource={VoidIllustration}
            illustrationStyles={{maxWidth: "128px"}}
            text={`
                Aktualnie nie dodałeś/aś żadnych wydatków, 
                przez co nie jest możliwe wyświetlenie wykresów
            `} 
        />
    )
}