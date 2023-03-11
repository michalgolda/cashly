import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

import { StyledToastWrapper } from './AppToastContainer.styled'

export default function AppToastContainer() {
    return (
        <StyledToastWrapper>
            <ToastContainer
                limit={3}
                theme="dark"
                position="bottom-right"
                rtl={false}
                autoClose={3500}
                newestOnTop={false}
                closeButton={false}
                hideProgressBar
            />
        </StyledToastWrapper>
    )
}
