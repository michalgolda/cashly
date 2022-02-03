import PropTypes from "prop-types";
import styled from "styled-components";


const StyledHeader = styled.header`
    height: auto;
    padding: 64px;
    background-color: white;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray400};
`;

const StyledWrapper = styled.div`
    display: flex;
    margin: 0 auto;
    max-width: 1024px;
    align-items: center;
    justify-content: space-between;
`;

const StyledDescription = styled.p`
    margin-top: 4px;
    color: ${({ theme }) => theme.colors.gray600};
    font-size: ${({ theme }) => theme.fontSizes.h5};
`;

const StyledLeftContentWrapper = styled.div`
    display: flex;
    margin-right: 32px;
    flex-direction: column;
`;

const StyledRightContentWrapper = styled.div`
    display: flex;
    row-gap: 16px;
    margin-left: 8px;
    flex-direction: column;
`;

function Header(props) {
    const { title, description, rightElement } = props;

    return (
        <StyledHeader {...props}>
            <StyledWrapper>
                <StyledLeftContentWrapper>
                    {title && <h1>{title}</h1>}
                    {description && (
                        <StyledDescription>
                            {description}
                        </StyledDescription>
                    )}
                </StyledLeftContentWrapper>
                {rightElement && (
                    <StyledRightContentWrapper>
                        {rightElement}
                    </StyledRightContentWrapper>
                )}
            </StyledWrapper>
        </StyledHeader>
    );
}

Header.propTypes = {
    description: PropTypes.string,
    rightElement: PropTypes.element,
    title: PropTypes.string.isRequired
};

export default Header;