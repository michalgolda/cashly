import Image from 'next/image'
import styled from 'styled-components'

export const StyledContainer = styled.div`
    padding: 32px;
    text-align: center;
    background-color: white;
    border: 1px solid #f3f3f3;
`

export const StyledIllustrationWrapper = styled.div`
    width: 100%;
    margin: 0 auto;
    max-width: 256px;

    img {
        position: inherit !important;
    }
`

export const StyledText = styled.p`
    margin-top: 16px;
    font-size: 1.2rem;
    font-weight: 700;
`

export const StyledBottomElementWrapper = styled.div`
    margin-top: 32px;
`
