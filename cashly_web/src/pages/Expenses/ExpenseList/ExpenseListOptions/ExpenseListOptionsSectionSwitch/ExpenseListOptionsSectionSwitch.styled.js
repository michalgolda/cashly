import styled from 'styled-components';

import { Box } from '../ExpenseListOptions.styled';

const Container = styled(Box)`
  display: grid;
  row-gap: 1rem;
  column-gap: 1rem;
  grid-template-columns: 1fr;
  border-bottom-left-radius: ${({ showOptionsSection }) =>
    showOptionsSection ? '0' : '2px'};
  border-bottom-right-radius: ${({ showOptionsSection }) =>
    showOptionsSection ? '0' : '2px'};

  @media (min-width: 768px) {
    display: flex;
    flex-direction: row;
    max-width: min-content;
  }
`;

export { Container };
