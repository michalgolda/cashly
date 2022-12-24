import styled from 'styled-components';

import { List as BaseList } from '@/components';

const List = styled(BaseList)`
  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 375px) {
    grid-template-columns: 1fr;
  }
`;

export { List };
