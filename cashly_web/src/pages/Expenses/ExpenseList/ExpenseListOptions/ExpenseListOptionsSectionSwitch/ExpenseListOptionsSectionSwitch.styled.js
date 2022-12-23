import styled from 'styled-components';

import { Box } from '../ExpenseListOptions.styled';

const Container = styled(Box)`
  display: flex;
  column-gap: 1rem;
  flex-direction: row;
  max-width: min-content;
  border-bottom-left-radius: ${({ showOptionsSection }) =>
    showOptionsSection ? '0' : '2px'};
  border-bottom-right-radius: ${({ showOptionsSection }) =>
    showOptionsSection ? '0' : '2px'};
`;

export { Container };
