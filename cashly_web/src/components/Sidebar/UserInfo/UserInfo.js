import styled from "styled-components";
import { Avatar } from "@/components";
import { getLetterFromEmail, getUsernameFromEmail } from "@/utils";

export const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`;

const StyledUsername = styled.p`
  margin-left: 8px;
  max-width: 180px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: ${({ theme }) => theme.fontSizes.h5};
`;

function UserInfo({ email }) {
  return (
    <StyledContainer>
      <Avatar email={getLetterFromEmail(email)} />
      <StyledUsername>{getUsernameFromEmail(email)}</StyledUsername>
    </StyledContainer>
  );
}

export default UserInfo;
