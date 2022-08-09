import styled from "styled-components";

const List = styled.div`
  display: grid;
  grid-row-gap: 32px;
  grid-template-rows: auto auto;
`;

const Group = styled.div`
  display: grid;
  grid-column-gap: 32px;
  grid-template-columns: ${({ columns }) => `repeat(${columns}, 1fr)`};
`;

export { List, Group };
