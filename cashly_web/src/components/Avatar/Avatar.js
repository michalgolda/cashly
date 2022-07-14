import styled from "styled-components";
import { getLetterFromEmail } from "@/utils";

const StyledContainer = styled.div`
  width: 45px;
  height: 45px;
  display: flex;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.blue400};
`;

const StyledLetter = styled.p`
  color: white;
  padding-top: 4px;
  font-size: ${({ theme }) => theme.fontSizes.h5};
`;

function Avatar({ email }) {
  return (
    <StyledContainer>
      <StyledLetter>{getLetterFromEmail(email)}</StyledLetter>
    </StyledContainer>
  );
}

export default Avatar;
