import PropTypes from "prop-types";
import styled from "styled-components";


const StyledWrapper = styled.div`padding: 64px;`;

const StyledContainer = styled.main`
    width: 100%;
    margin: 0 auto;
    max-width: 1024px;
`;

function PageMain({ children }) {
    return (
        <StyledWrapper>
            <StyledContainer>
                {children}
            </StyledContainer>
        </StyledWrapper>
    );
}

PageMain.propTypes = { children: PropTypes.node };

export default PageMain;