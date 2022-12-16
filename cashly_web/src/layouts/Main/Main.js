import { Footer, Sidebar } from '@/components';

import * as S from './Main.styled';

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
