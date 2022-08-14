import styled from "styled-components";

const Main = styled.div`
  height: auto;
  display: flex;
  flex-direction: row;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  overflow-y: auto;
  max-height: 100vh;
  flex-direction: column;
`;

export { Main, Content };
