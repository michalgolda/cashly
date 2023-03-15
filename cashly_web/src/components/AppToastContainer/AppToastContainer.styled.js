import styled from 'styled-components'

export const StyledToastWrapper = styled.div`
    --toastify-icon-color-error: #ff4e4e;
    --toastify-icon-color-warning: #fede35;
    --toastify-icon-color-success: #04ff68;

    .Toastify__toast {
        color: white;
        box-shadow: none;
        border-radius: 0;
        background-color: #000;
        margin: 0px 16px 16px 16px;
    }

    .Toastify__toast-body {
        padding: 8px 16px;
    }

    .Toastify__toast-container {
        padding: 0;
    }

    .Toastify__toast-container--bottom-right {
        right: 0;
        bottom: 0;
    }

    .Toastify__toast-icon {
        margin-right: 16px;
    }
`
