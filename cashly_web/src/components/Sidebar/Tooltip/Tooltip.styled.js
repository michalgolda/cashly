import styled from 'styled-components';

const Tooltip = styled.div`
  color: white;
  padding: 4px 8px;
  width: max-content;
  border-radius: 2px;
  background-color: ${({ theme }) => theme.colors.primary400};
`;

export { Tooltip };
