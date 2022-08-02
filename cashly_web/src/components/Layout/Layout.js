import PropTypes from "prop-types";
import styled from "styled-components";

import { Sidebar, Footer } from "@/components";

const StyledLayout = styled.div`
  height: auto;
  display: flex;
  flex-direction: row;
`;

const StyledContentWrapper = styled.div`
  width: 100%;
  display: flex;
  overflow-y: auto;
  max-height: 100vh;
  flex-direction: column;
`;

function Layout({ children }) {
  return (
    <StyledLayout>
      <Sidebar />
      <StyledContentWrapper>
        {children}
        <Footer />
      </StyledContentWrapper>
    </StyledLayout>
  );
}

Layout.propTypes = { children: PropTypes.node.isRequired };

export default Layout;
