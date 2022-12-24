import styled from 'styled-components';

const List = styled.ul`
  width: 100%;
  display: grid;
  row-gap: 16px;
  column-gap: 1rem;
  list-style: none;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 375px) {
    grid-template-columns: 1fr;
  }
`;

export { List };
