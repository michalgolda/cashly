import styled from 'styled-components'

export const StyledToastWrapper = styled.div`
    --toastify-icon-color-error: #ff4e4e;
    --toastify-icon-color-warning: #fede35;
    --toastify-icon-color-success: #04ff68;

    .Toastify__toast {
        margin: 0;
        color: white;
        box-shadow: none;
        background-color: #000;
    }

    .Toastify__toast-body {
        padding: 8px 16px;
    }

    .Toastify__toast-container {
        padding: 0;
    }

    .Toastify__toast-container--bottom-right {
        right: 16px;
        bottom: 16px;
    }
`
