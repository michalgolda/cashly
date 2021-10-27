import styled from "styled-components";
import { Layout } from "../components";

const StyledText = styled.h1`
    padding: 2rem;
    font-size: ${({ theme }) => theme.font.sizes.h1};
`;

export default function SpendCategories() {
    return (
        <Layout>
            <StyledText>Spend categories</StyledText>
        </Layout>
    );
}