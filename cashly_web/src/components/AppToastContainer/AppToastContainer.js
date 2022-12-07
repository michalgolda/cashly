import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import * as S from "./AppToastContainer.styled";

export default function AppToastContainer() {
    return (
        <S.ToastContainerWrapper>
            <ToastContainer 
                limit={3}
                theme="light"
                position="bottom-right"
                rtl={false}
                autoClose={1500}
                newestOnTop={false}
                closeButton={false}
                pauseOnHover
            />
        </S.ToastContainerWrapper>
    )
}