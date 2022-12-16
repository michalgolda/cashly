import styled from 'styled-components';

import { IconButton } from '@/components';

const ActionButton = styled(IconButton)`
  color: white;
  background-color: ${({ theme }) => theme.colors.blue400};

  &:hover {
    background-color: ${({ theme }) => theme.colors.blue500};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.blue300};
  }
`;

export { ActionButton };
