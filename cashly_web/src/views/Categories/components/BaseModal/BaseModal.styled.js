import styled from 'styled-components'

import Input from '@/components/Input/Input'
import Modal from '@/components/Modal/Modal'

export const StyledModal = styled(Modal)`
    text-align: center;
`

export const StyledTextContainer = styled.div`
    margin: 16px 0 32px 0;
`

export const StyledForm = styled.form`
    display: grid;
    row-gap: 1rem;
    margin-top: 16px;
`

export const StyledColorInput = styled(Input)`
    padding: 0;
    height: 40px;

    &::-webkit-color-swatch {
        border: none;
    }
    &::-webkit-color-swatch-wrapper {
        padding: 0;
    }
`
