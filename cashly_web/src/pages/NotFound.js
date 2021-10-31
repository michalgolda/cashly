import styled from "styled-components";
import { Layout, LinkButton } from "../components";

const StyledLinkButton = styled(LinkButton)`margin-top: 1rem;`;

export default function NotFound() {
    return (
        <Layout>
            <h1>Strona, której szukasz nie istnieje.</h1>
            <StyledLinkButton 
                size="medium"
                to="/spendings" 
                variant="primary" 
            >
                Strona główna
            </StyledLinkButton>
        </Layout>
    );
}