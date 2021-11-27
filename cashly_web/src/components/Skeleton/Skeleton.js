import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";


const pulseAnimation = keyframes`
    0% { opacity: 1; }
    50% { opacity: .4; }
    100% { opacity: 1; }
`;

const StyledSkeleton = styled.span`
    display: block;
    width: ${({ width }) => width ? `${width}px` : "100%"};
    height: ${({ height }) => height ? `${height}px` : "auto"};
    animation: ${pulseAnimation} 1.2s ease-in-out infinite;
    background-color: ${({ theme }) => theme.colors.gray400};
`;

const StyledRectangleSkeleton = styled(StyledSkeleton)`border-radius: 2px;`;

const StyledCircleSkeleton = styled(StyledSkeleton)`border-radius: 50%;`;

const mappedSkeletonTypes = {
    "circle": StyledCircleSkeleton,
    "rectangle": StyledRectangleSkeleton
};

function Skeleton({ type, width, height, className }) {
    const ChoosedSkeletonType = mappedSkeletonTypes[type];

    return (
        <ChoosedSkeletonType 
            width={width} 
            height={height} 
            className={className} 
        />
    );
}

Skeleton.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    type: PropTypes.oneOf([
        "rectangle", 
        "circle"
    ])
};

Skeleton.defaultProps = { type: "rectangle" };

export default Skeleton;