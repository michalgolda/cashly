import PropTypes from "prop-types";
import * as S from "./Layout.styles";
import { Sidebar, Footer } from "@/components";

function Layout({ children, ...props }) {
  return (
    <S.Layout {...props}>
      <Sidebar />
      <S.Content>
        {children}
        <Footer />
      </S.Content>
    </S.Layout>
  );
}

Layout.propTypes = { children: PropTypes.node.isRequired };

export default Layout;
