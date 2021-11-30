import PropTypes from "prop-types";
import styled, { css } from "styled-components";


const StyledWidget = styled.div`
    border-radius: 2px;
    background-color: white;
    border: 1px solid ${({ theme }) => theme.colors.gray400};
`;

const StyledHeader = styled.div`
    padding: 15px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray400};
`;

const StyledTitle = styled.p`
    color: ${({ theme }) => theme.colors.gray600};
    font-size: ${({ theme }) => theme.fontSizes.h5};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const StyledBody = styled.div`
    padding: 15px;
    ${({ centerContent }) => centerContent && css`
        display: flex;
        justify-content: center;
    `}
`;

function Widget({ className, children, title, centerContent }) {
    return (
        <StyledWidget className={className}>
            {title && (
                <StyledHeader>
                    <StyledTitle>{title}</StyledTitle>
                </StyledHeader>
            )}
            <StyledBody centerContent>
                {children}
            </StyledBody>
        </StyledWidget>
    )
}

Widget.propTypes = {
    centerContent: PropTypes.bool,
    title: PropTypes.string.isRequired
};

Widget.defaultProps = { centerContent: true };

export default Widget;