import pytest

from app.usecases.user import (
    GetUserByIdUseCase,
    SendEmailVerificationRequestUseCase,
    UserNotFoundError,
    VerifyEmailUseCase,
)


def test_get_user_by_id(mocker):
    mock_user_entity = mocker.patch("app.entities.User")
    mock_user_repo = mocker.patch("app.repositories.UserRepository")
    mock_user_repo.get_by_id.return_value = mock_user_entity

    usecase_input = mocker.patch("app.usecases.user.GetUserByIdUseCaseInput")

    usecase = GetUserByIdUseCase(user_repo=mock_user_repo)
    usecase_output = usecase.execute(usecase_input)

    assert usecase_output.user == mock_user_entity

    mock_user_repo.get_by_id.assert_called_once_with(usecase_input.user_id)


def test_get_user_by_id_when_user_not_found(mocker):
    mock_user_repo = mocker.patch("app.repositories.UserRepository")
    mock_user_repo.get_by_id.return_value = None

    usecase_input = mocker.patch("app.usecases.user.VerifyEmailUseCaseInput")

    usecase = GetUserByIdUseCase(user_repo=mock_user_repo)
    with pytest.raises(UserNotFoundError):
        usecase.execute(usecase_input)

    mock_user_repo.get_by_id.assert_called_once_with(usecase_input.user_id)


def test_verify_email_usecase(mocker):
    mock_user_entity = mocker.patch("app.entities.User")
    mock_user_entity.email_is_verified = False

    mock_user_repo = mocker.patch("app.repositories.UserRepository")
    mock_user_repo.get_by_email.return_value = mock_user_entity

    mock_security_manager = mocker.patch("app.security.SecurityManager")
    mock_security_manager.check_email_verification_token.return_value = {
        "sub": mock_user_entity.email,
    }

    mock_message_client = mocker.patch("app.messages.MessageClient")

    mock_usecase_input = mocker.patch("app.usecases.user.VerifyEmailUseCaseInput")

    usecase = VerifyEmailUseCase(
        user_repo=mock_user_repo,
        security_manager=mock_security_manager,
        message_client=mock_message_client,
    )
    usecase.execute(mock_usecase_input)

    mock_security_manager.check_email_verification_token.assert_called_once_with(
        mock_usecase_input.email_verification_token
    )
    mock_user_repo.get_by_email.assert_called_once_with(mock_user_entity.email)

    assert mock_user_entity.email_is_verified == True

    email_message = mock_message_client.send.call_args[0][0]
    assert email_message.title == "Cashly - Potwierdzenie weryfikacji adresu e-mail"
    assert email_message.recipients == [mock_user_entity.email]
    assert email_message.template_name == "email-verification-success.html"


def test_send_email_verification_request(mocker):
    mock_user_entity = mocker.patch("app.entities.User")
    mock_user_entity.email_is_verified = False

    mock_user_repo = mocker.patch("app.repositories.UserRepository")
    mock_user_repo.get_by_email.return_value = mock_user_entity

    mock_security_manager = mocker.patch("app.security.SecurityManager")
    mock_security_manager.generate_email_verification_token.return_value = (
        "email_verification_token"
    )

    mock_message_client = mocker.patch("app.messages.MessageClient")

    mock_usecase_input = mocker.patch(
        "app.usecases.user.SendEmailVerificationRequestUseCaseInput"
    )

    usecase = SendEmailVerificationRequestUseCase(
        user_repo=mock_user_repo,
        security_manager=mock_security_manager,
        message_client=mock_message_client,
    )
    usecase.execute(mock_usecase_input)

    mock_security_manager.generate_email_verification_token.assert_called_once_with(
        mock_usecase_input.email
    )
    mock_user_repo.get_by_email.assert_called_once_with(mock_usecase_input.email)

    email_message = mock_message_client.send.call_args[0][0]
    assert email_message.title == "Cashly - Weryfikacja adresu e-mail"
    assert email_message.recipients == [mock_usecase_input.email]
    assert email_message.template_name == "email-verification-request.html"
    assert email_message.payload == {
        "email_verification_token": "email_verification_token"
    }


def test_send_email_verification_request_when_user_email_is_already_verified(mocker):
    mock_user_entity = mocker.patch("app.entities.User")
    mock_user_entity.email_is_verified = True

    mock_user_repo = mocker.patch("app.repositories.UserRepository")
    mock_user_repo.get_by_email.return_value = mock_user_entity

    mock_security_manager = mocker.patch("app.security.SecurityManager")
    mock_message_client = mocker.patch("app.messages.MessageClient")

    mock_usecase_input = mocker.patch(
        "app.usecases.user.SendEmailVerificationRequestUseCaseInput"
    )

    usecase = SendEmailVerificationRequestUseCase(
        user_repo=mock_user_repo,
        security_manager=mock_security_manager,
        message_client=mock_message_client,
    )
    usecase.execute(mock_usecase_input)

    mock_user_repo.get_by_email.assert_called_once_with(mock_usecase_input.email)
    assert not mock_message_client.send.called


def test_send_email_verification_request_when_user_not_found(mocker):
    mock_user_repo = mocker.patch("app.repositories.UserRepository")
    mock_user_repo.get_by_email.return_value = None

    mock_security_manager = mocker.patch("app.security.SecurityManager")
    mock_message_client = mocker.patch("app.messages.MessageClient")

    mock_usecase_input = mocker.patch(
        "app.usecases.user.SendEmailVerificationRequestUseCaseInput"
    )

    usecase = SendEmailVerificationRequestUseCase(
        user_repo=mock_user_repo,
        security_manager=mock_security_manager,
        message_client=mock_message_client,
    )
    with pytest.raises(UserNotFoundError):
        usecase.execute(mock_usecase_input)

    mock_user_repo.get_by_email.assert_called_once_with(mock_usecase_input.email)
