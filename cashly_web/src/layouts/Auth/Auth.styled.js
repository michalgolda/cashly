import styled from 'styled-components';

import { Logo as BaseLogo } from '@/components';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 100%;
  min-width: 256px;
  max-width: 512px;
`;

const Logo = styled(BaseLogo)`
  font-size: 2.4rem;
  text-align: center;
  margin-bottom: 32px;
`;

export { Container, Wrapper, Logo };
