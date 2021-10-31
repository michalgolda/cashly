import PropTypes from "prop-types";
import styled from "styled-components";

const StyledSection = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

const StyledTextWrapper = styled.div`
    display: grid;
    max-width: 600px;
    margin-right: 1rem;
    grid-row-gap: 1rem;
    grid-template-rows: min-content min-content;
`;

const StyledDescription = styled.p`
    color: ${({ theme }) => theme.colors.gray600};
    font-weight: ${({ theme }) => theme.font.weights.semiBold};
`;

function Section({ children, title, description }) {
    return (
        <StyledSection>
            <StyledTextWrapper>
                <h2>{title}</h2>
                <StyledDescription>{description}</StyledDescription>
            </StyledTextWrapper>
            {children}
        </StyledSection>
    );
}

Section.propTypes = {
    children: PropTypes.node,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
};

export default Section;