import { StyledContainer } from "../UserInfo/UserInfo";
import { Skeleton } from "@/components";

function UserInfoSkeleton() {
  return (
    <StyledContainer>
      <Skeleton type="circle" width={45} height={45} />
      <Skeleton
        type="rectangle"
        height={16}
        width={147}
        style={{ marginLeft: 8 }}
      />
    </StyledContainer>
  );
}

export default UserInfoSkeleton;
