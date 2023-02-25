import PropTypes from 'prop-types'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'

import { userService } from '@/api/services'
import { notifyUnhandledError } from '@/utils/notifyUnhandledError'

import CloseButton from '../CloseButton/CloseButton'
import {
    StyledContainer,
    StyledResendEmailVerificationButton,
    StyledText,
    StyledTextContainer,
    StyledWrapper,
} from './EmailVerificationReminder.styled'

function EmailVerificationReminder({ email, onHide, isHidden }) {
    const notifySendEmailVerificationRequestSuccess = () =>
        toast.success('Kod weryfikacyjny został wysłany na podany adres email.')

    const sendEmailVerificationRequestMutation = useMutation(
        userService.sendEmailVerificationRequest,
        {
            onSuccess: () => {
                notifySendEmailVerificationRequestSuccess()
            },
            onError: () => notifyUnhandledError(),
        }
    )

    if (isHidden) return null

    return (
        <StyledContainer>
            <StyledWrapper>
                <StyledTextContainer>
                    <StyledText>
                        Twój adres email jest niezweryfikowany.
                    </StyledText>
                    <StyledResendEmailVerificationButton
                        onClick={() =>
                            sendEmailVerificationRequestMutation.mutate({
                                email,
                            })
                        }
                    >
                        Zweryfikuj
                    </StyledResendEmailVerificationButton>
                </StyledTextContainer>
                <CloseButton onClick={onHide} variant="light" />
            </StyledWrapper>
        </StyledContainer>
    )
}

EmailVerificationReminder.propTypes = {
    email: PropTypes.string,
    emailIsVerified: PropTypes.bool,
}

export default EmailVerificationReminder
