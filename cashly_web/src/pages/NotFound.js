import styled from "styled-components";

import { Page, LinkButton, Informer, Layout } from "../components";
import NotFoundIllustration from "../assets/notFound.svg";


const StyledWrapper = styled.div`margin: 128px auto;`;

export default function NotFound() {
    return (
        <Page title="Cashly - 404">
            <Layout>
                <StyledWrapper>
                    <Informer
                        illustrationSource={NotFoundIllustration}
                        bottomElement={<LinkButton to="/">Strona główna</LinkButton>}
                        text="Strona, której szukasz nie istnieje lub została przeniesiona"
                    />
                </StyledWrapper>
            </Layout>
        </Page>
    );
}