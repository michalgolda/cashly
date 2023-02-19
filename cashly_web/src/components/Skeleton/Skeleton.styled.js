import styled, { keyframes } from 'styled-components'

const pulseAnimation = keyframes`
    0% { opacity: 1; }
    50% { opacity: .4; }
    100% { opacity: 1; }
`

export const StyledBaseSkeleton = styled.span`
    display: block;
    width: ${({ width }) => (width ? `${width}px` : '100%')};
    height: ${({ height }) => (height ? `${height}px` : 'auto')};
    animation: ${pulseAnimation} 1.2s ease-in-out infinite;
    background-color: ${({ theme }) => theme.colors.gray400};
`

export const StyledRectangleSkeleton = styled(StyledBaseSkeleton)`
    border-radius: 2px;
`

export const StyledCircleSkeleton = styled(StyledBaseSkeleton)`
    border-radius: 50%;
`
