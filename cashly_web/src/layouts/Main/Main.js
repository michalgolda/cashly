import * as S from "./Main.styled";
import { Sidebar, Footer } from "@/components";

export default function Layout({ children, ...props }) {
  return (
    <S.Main {...props}>
      <Sidebar />
      <S.Content>
        {children}
        <Footer />
      </S.Content>
    </S.Main>
  );
}
