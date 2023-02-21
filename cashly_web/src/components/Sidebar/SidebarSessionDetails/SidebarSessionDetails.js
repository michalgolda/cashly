import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'

import IconButton from '@/components/IconButton/IconButton'
import Skeleton from '@/components/Skeleton/Skeleton'
import { getLetterFromEmail } from '@/utils/getLetterFromEmail'

import {
    StyledContainer,
    StyledUserAvatar,
} from './SidebarSessionDetails.styled'

function SessionDetails({ userEmail, onLogout, ...props }) {
    return (
        userEmail && (
            <StyledContainer {...props}>
                {userEmail ? (
                    <>
                        <StyledUserAvatar
                            letter={getLetterFromEmail(userEmail)}
                        />
                        <IconButton
                            onClick={onLogout}
                            variant="text"
                            icon={faArrowRightFromBracket}
                        />
                    </>
                ) : (
                    <>
                        <Skeleton
                            type="circle"
                            style={{ minWidth: '45px' }}
                            width={45}
                            height={45}
                        />
                        <Skeleton className="currentUserEmail" height={8} />
                        <Skeleton
                            style={{ minWidth: 40 }}
                            width={40}
                            height={40}
                        />
                    </>
                )}
            </StyledContainer>
        )
    )
}

SessionDetails.propTypes = {
    userEmail: PropTypes.string,
    onLogout: PropTypes.func,
}

export default SessionDetails
