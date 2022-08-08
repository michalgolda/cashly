import { IconButton, Skeleton } from "@/components";
import { getLetterFromEmail } from "@/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import * as S from "./CurrentUserDetails.styled";

export default function CurrentUserDetails({ user, logoutHandler, ...props }) {
  return user ? (
    <S.Container className="currentUserDetails" {...props}>
      <S.UserAvatar letter={getLetterFromEmail(user.email)} />
      <S.UserEmail className="currentUserEmail">{user.email}</S.UserEmail>
      <IconButton
        onClick={logoutHandler}
        variant="text"
        icon={<FontAwesomeIcon icon={faArrowRightFromBracket} />}
      />
    </S.Container>
  ) : (
    <S.Container className="currentUserDetails">
      <Skeleton
        type="circle"
        style={{ minWidth: "45px" }}
        width={45}
        height={45}
      />
      <Skeleton className="currentUserEmail" height={8} />
      <Skeleton style={{ minWidth: 40 }} width={40} height={40} />
    </S.Container>
  );
}
