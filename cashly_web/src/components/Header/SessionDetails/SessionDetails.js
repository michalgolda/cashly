import Avatar from '@/components/Avatar/Avatar'
import Skeleton from '@/components/Skeleton/Skeleton'
import { getLetterFromEmail } from '@/utils/getLetterFromEmail'

import { StyledContainer, StyledEmail } from './SessionDetails.styled'

function SessionDetailsSkeleton() {
    return (
        <StyledContainer>
            <Skeleton type="circle" width={40} height={40} />
            <Skeleton height={8} width={128} />
        </StyledContainer>
    )
}

export default function SessionDetails({ className, userEmail }) {
    if (!userEmail) return <SessionDetailsSkeleton />

    return (
        <StyledContainer className={className}>
            <Avatar letter={getLetterFromEmail(userEmail)} />
            <StyledEmail>{userEmail}</StyledEmail>
        </StyledContainer>
    )
}
