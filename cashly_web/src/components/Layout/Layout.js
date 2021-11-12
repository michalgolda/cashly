import PropTypes from "prop-types";
import styled from "styled-components";

import { Sidebar } from "../../components";


const StyledLayout = styled.div`
    height: auto;
    display: flex;
    flex-direction: row;
`;

const StyledContentWrapper = styled.div`
    width: 100%;
    display: flex;
    margin-left: 256px;
    flex-direction: column;
`;

function Layout({ children }) {
    return (
        <StyledLayout>
            <Sidebar />
            <StyledContentWrapper>
                {children}
            </StyledContentWrapper>
        </StyledLayout>
    );
}

Layout.propTypes = { children: PropTypes.node.isRequired };

export default Layout;