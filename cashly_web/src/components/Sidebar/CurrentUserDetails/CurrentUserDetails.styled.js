import styled from 'styled-components';

import { Avatar } from '@/components';

const Container = styled.div`
  padding: 16px;
  display: flex;
  column-gap: 16px;
  flex-direction: row;
  align-items: center;
  row-gap: 16px;
  flex-direction: column;
`;

const UserAvatar = styled(Avatar)`
  flex: 0;
`;

export { Container, UserAvatar };
