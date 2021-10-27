import PropTypes from "prop-types";
import styled from "styled-components";
import { Header, Sidebar } from "../../components";

const StyledContainer = styled.div`
    width: 100vw; 
    height: auto;
    display: grid;
    grid-template-columns: auto 1fr;
`;


function Layout({ children }) {
    return (
        <>
            <Header />
            <StyledContainer>
                <Sidebar />
                <div>{children}</div>
            </StyledContainer>
        </>
    );
}

Layout.propTypes = { children: PropTypes.node.isRequired };

export default Layout;