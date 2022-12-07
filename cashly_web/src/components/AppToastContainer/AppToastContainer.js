import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import * as S from "./AppToastContainer.styled";

export default function AppToastContainer() {
    return (
        <S.ToastContainerWrapper>
            <ToastContainer 
                theme="light"
                position="bottom-right"
                rtl={false}
                autoClose={3000}
                newestOnTop={false}
                closeButton={false}
                pauseOnHover
            />
        </S.ToastContainerWrapper>
    )
}