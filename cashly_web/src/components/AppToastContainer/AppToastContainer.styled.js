import styled from 'styled-components'

export const StyledToastWrapper = styled.div`
    --toastify-icon-color-success: #52f792;
    --toastify-color-progress-success: #52f792;
    --toastify-icon-color-error: ${({ theme }) => theme.colors.red400};
    --toastify-color-progress-error: ${({ theme }) => theme.colors.red400};

    .Toastify__toast {
        border-radius: 2px;
        color: ${({ theme }) => theme.colors.primary400};
    }
`
