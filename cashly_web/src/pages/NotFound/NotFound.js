import * as S from "./NotFound.styled";
import { Page, LinkButton, Informer } from "@/components";
import NotFoundIllustration from "@/assets/notFound.svg";

export default function NotFound() {
  return (
    <Page title="Cashly - 404">
      <S.Wrapper>
        <Informer
          illustrationSource={NotFoundIllustration}
          bottomElement={<LinkButton to="/">Powrót</LinkButton>}
          text="Strona, której szukasz nie istnieje lub została przeniesiona"
        />
      </S.Wrapper>
    </Page>
  );
}
