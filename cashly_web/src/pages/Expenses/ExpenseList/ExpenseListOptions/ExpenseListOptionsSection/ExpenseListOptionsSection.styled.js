import styled from 'styled-components';

import { Box } from '../ExpenseListOptions.styled';

const Container = styled(Box)`
  display: grid;
  row-gap: 1rem;
  column-gap: 1rem;
  align-items: end;
  border-top-left-radius: 0;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

export { Container };
