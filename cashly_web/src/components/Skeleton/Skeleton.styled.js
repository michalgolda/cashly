import styled, { keyframes } from 'styled-components';

const pulseAnimation = keyframes`
    0% { opacity: 1; }
    50% { opacity: .4; }
    100% { opacity: 1; }
`;

const BaseSkeleton = styled.span`
  display: block;
  width: ${({ width }) => (width ? `${width}px` : '100%')};
  height: ${({ height }) => (height ? `${height}px` : 'auto')};
  animation: ${pulseAnimation} 1.2s ease-in-out infinite;
  background-color: ${({ theme }) => theme.colors.gray400};
`;

const RectangleSkeleton = styled(BaseSkeleton)`
  border-radius: 2px;
`;

const CircleSkeleton = styled(BaseSkeleton)`
  border-radius: 50%;
`;

export { RectangleSkeleton, CircleSkeleton };
