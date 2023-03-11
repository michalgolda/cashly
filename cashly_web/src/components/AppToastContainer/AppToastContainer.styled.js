import styled from 'styled-components'

export const StyledToastWrapper = styled.div`
    --toastify-icon-color-error: #ff4e4e;
    --toastify-icon-color-warning: #fede35;
    --toastify-icon-color-success: #04ff68;

    .Toastify__toast {
        color: white;
        box-shadow: none;
        background-color: #000;
    }

    .Toastify__toast-body {
        padding: 8px 16px;
    }
`
