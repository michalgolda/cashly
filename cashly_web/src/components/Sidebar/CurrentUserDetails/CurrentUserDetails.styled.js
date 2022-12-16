import styled from 'styled-components';

import { Avatar } from '@/components';

const Container = styled.div`
  padding: 16px;
  display: flex;
  column-gap: 16px;
  flex-direction: row;
  align-items: center;
`;

const UserAvatar = styled(Avatar)`
  flex: 0;
`;

const UserEmail = styled.p`
  flex: auto;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export { Container, UserAvatar, UserEmail };
