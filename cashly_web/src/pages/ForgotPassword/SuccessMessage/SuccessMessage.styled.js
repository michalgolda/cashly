import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  column-gap: 16px;
  flex-direction: row;
`;

const MessageIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MessageIcon = styled(FontAwesomeIcon)`
  color: #52f792;
  font-size: 3.5rem;
`;

export { Container, MessageIconWrapper, MessageIcon };
