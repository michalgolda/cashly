import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";


const pulseAnimation = keyframes`
    0% { opacity: 1; }
    50% { opacity: .4; }
    100% { opacity: 1; }
`;

const StyledSkeleton = styled.span`
    display: block;
    border-radius: 2px;
    animation: ${pulseAnimation} 1.2s ease-in-out infinite;
    background-color: ${({ theme }) => theme.colors.gray400};
`;

function Skeleton({ width, height }) {
    return (
        <StyledSkeleton
            style={{
                width: width ? width : "100%", 
                height: height ? height : "auto"
            }} 
        />
    );
}

Skeleton.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number
};

export default Skeleton;