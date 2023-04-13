import styled, { keyframes } from 'styled-components'
import { variant } from 'styled-system'

const pulseAnimation = keyframes`
    0% { opacity: 1; }
    50% { opacity: .4; }
    100% { opacity: 1; }
`

export const StyledSkeleton = styled.span`
    display: block;
    width: ${({ width }) => (width ? `${width}px` : '100%')};
    height: ${({ height }) => (height ? `${height}px` : 'auto')};
    animation: ${pulseAnimation} 1.2s ease-in-out infinite;
    background-color: ${({ theme }) => theme.colors.gray400};

    ${variant({
        prop: 'type',
        variants: {
            circle: {
                borderRadius: '50%',
            },
            rectangle: {
                borderRadius: '2px',
            },
        },
    })}
`
