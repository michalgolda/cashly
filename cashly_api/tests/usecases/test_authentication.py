import pytest

from app.entities import User, ExpenseCategory
from app.exceptions import (
    BadAuthenticationCredentialsError,
    UserEmailAlreadyUsedError,
    UserNotFoundError,
)
from app.usecases.authentication import (
    LoginUseCase,
    RegisterUseCase,
    ResetPasswordUseCase,
    SendResetPasswordLinkUseCase,
)


def test_register_usecase(mocker):
    mock_user = mocker.patch("app.entities.User")

    mock_user_repo = mocker.patch("app.repositories.UserRepository")
    mock_user_repo.get_by_email.return_value = None

    mock_expense_category_repo = mocker.patch(
        "app.repositories.ExpenseCategoryRepository"
    )

    mock_security_manager = mocker.patch("app.security.SecurityManager")
    mock_security_manager.generate_password_hash.return_value = "password_hash"
    mock_security_manager.generate_email_verification_token.return_value = (
        "email_verification_token"
    )

    mock_message_client = mocker.patch("app.messages.MessageClient")

    mock_usecase_input = mocker.patch(
        "app.usecases.authentication.RegisterUseCaseInput"
    )
    mock_usecase_input.default_expense_categories = [
        {"name": "test1", "color": "#fff"},
        {"name": "test2", "color": "#000"},
        {"name": "test3", "color": "#f00"},
    ]

    usecase = RegisterUseCase(
        user_repo=mock_user_repo,
        expense_category_repo=mock_expense_category_repo,
        security_manager=mock_security_manager,
        message_client=mock_message_client,
    )
    usecase.execute(mock_usecase_input)

    assert mock_expense_category_repo.add.call_args_list[0][0][0] == ExpenseCategory(
        "test1", "#fff", None
    )
    assert mock_expense_category_repo.add.call_args_list[1][0][0] == ExpenseCategory(
        "test2", "#000", None
    )
    assert mock_expense_category_repo.add.call_args_list[2][0][0] == ExpenseCategory(
        "test3", "#f00", None
    )

    print(mock_user_repo.get_by_email.call_args_list)

    mock_user_repo.get_by_email.call_args_list[0][0][0] == mock_usecase_input.email
    mock_user_repo.get_by_email.call_args_list[1][0][0] == mock_usecase_input.email

    mock_user_repo.add.assert_called_once_with(
        User(email=mock_usecase_input.email, password="password_hash")
    )
    mock_security_manager.generate_password_hash.assert_called_once_with(
        mock_usecase_input.password
    )
    email_message = mock_message_client.send.call_args[0][0]
    assert email_message.title == "Cashly - Potwierdzenie rejestracji"
    assert email_message.recipients == [mock_usecase_input.email]
    assert email_message.template_name == "welcome-new-user.html"
    assert email_message.payload == {
        "email_verification_token": "email_verification_token"
    }


def test_register_usecase_when_user_email_is_already_used(mocker):
    mock_user_repo = mocker.patch("app.repositories.UserRepository")
    mock_user_repo.get_by_email.return_value = True

    mock_expense_category_repo = mocker.patch(
        "app.repositories.ExpenseCategoryRepository"
    )

    mock_security_manager = mocker.patch("app.security.SecurityManager")
    mock_message_client = mocker.patch("app.messages.MessageClient")

    mock_usecase_input = mocker.patch(
        "app.usecases.authentication.RegisterUseCaseInput"
    )
    mock_usecase_input.default_expense_categories = [
        {"name": "test1", "color": "#fff"},
        {"name": "test2", "color": "#000"},
        {"name": "test3", "color": "#f00"},
    ]

    usecase = RegisterUseCase(
        user_repo=mock_user_repo,
        expense_category_repo=mock_expense_category_repo,
        security_manager=mock_security_manager,
        message_client=mock_message_client,
    )

    with pytest.raises(UserEmailAlreadyUsedError):
        usecase.execute(mock_usecase_input)

    mock_user_repo.get_by_email.assert_called_once_with(mock_usecase_input.email)


def test_login_usecase(mocker):
    mock_user_entity = mocker.patch("app.entities.User")
    mock_user_entity.email_is_verified = True
    mock_user_repo = mocker.patch("app.repositories.UserRepository")
    mock_user_repo.get_by_email.return_value = mock_user_entity

    mock_security_manager = mocker.patch("app.security.SecurityManager")
    mock_security_manager.check_password_hash.return_value = True
    mock_security_manager.generate_access_token.return_value = "access_token"

    mock_usecase_input = mocker.patch("app.usecases.authentication.LoginUseCaseInput")

    usecase = LoginUseCase(
        user_repo=mock_user_repo, security_manager=mock_security_manager
    )
    usecase_output = usecase.execute(mock_usecase_input)

    assert usecase_output.access_token == "access_token"

    mock_user_repo.get_by_email.assert_called_once_with(mock_usecase_input.email)
    mock_security_manager.check_password_hash.assert_called_once_with(
        mock_usecase_input.password,
        mock_user_entity.password,
    )
    mock_security_manager.generate_access_token.assert_called_once_with(
        mock_user_entity.id
    )


def test_login_usecase_when_user_not_found_by_email(mocker):
    mock_user_repo = mocker.patch("app.repositories.UserRepository")
    mock_user_repo.get_by_email.return_value = None

    mock_security_manager = mocker.patch("app.security.SecurityManager")
    mock_usecase_input = mocker.patch("app.usecases.authentication.LoginUseCaseInput")

    usecase = LoginUseCase(
        user_repo=mock_user_repo, security_manager=mock_security_manager
    )

    with pytest.raises(BadAuthenticationCredentialsError):
        usecase.execute(mock_usecase_input)

    mock_user_repo.get_by_email.assert_called_once_with(mock_usecase_input.email)


def test_login_usecase_when_user_password_is_wrong(mocker):
    mock_user_entity = mocker.patch("app.entities.User")
    mock_user_repo = mocker.patch("app.repositories.UserRepository")
    mock_user_repo.get_by_email.return_value = mock_user_entity

    mock_security_manager = mocker.patch("app.security.SecurityManager")
    mock_security_manager.check_password_hash.return_value = False

    mock_usecase_input = mocker.patch("app.usecases.authentication.LoginUseCaseInput")

    usecase = LoginUseCase(
        user_repo=mock_user_repo, security_manager=mock_security_manager
    )

    with pytest.raises(BadAuthenticationCredentialsError):
        usecase.execute(mock_usecase_input)

    mock_user_repo.get_by_email.assert_called_once_with(mock_usecase_input.email)
    mock_security_manager.check_password_hash.assert_called_once_with(
        mock_usecase_input.password, mock_user_entity.password
    )


def test_send_reset_password_link_usecase(mocker):
    mock_user_entity = mocker.patch("app.entities.User")
    mock_user_repo = mocker.patch("app.repositories.UserRepository")
    mock_user_repo.get_by_email.return_value = mock_user_entity

    mock_message_client = mocker.patch("app.messages.MessageClient")
    mock_security_manager = mocker.patch("app.security.SecurityManager")
    mock_security_manager.generate_reset_password_token.return_value = (
        "reset_password_token"
    )

    mock_usecase_input = mocker.patch(
        "app.usecases.authentication.SendResetPasswordLinkUseCaseInput"
    )

    usecase = SendResetPasswordLinkUseCase(
        user_repo=mock_user_repo,
        message_client=mock_message_client,
        security_manager=mock_security_manager,
    )
    usecase.execute(mock_usecase_input)

    mock_user_repo.get_by_email.assert_called_once_with(mock_usecase_input.email)
    mock_security_manager.generate_reset_password_token.assert_called_once_with(
        mock_user_entity.email
    )

    email_message = mock_message_client.send.call_args[0][0]
    assert email_message.title == "Cashly - Resetowanie hasła"
    assert email_message.recipients == [mock_user_entity.email]
    assert email_message.template_name == "password-recovery-request.html"
    assert email_message.payload == {"password_recovery_token": "reset_password_token"}


def test_send_reset_password_link_usecase_when_user_not_found_by_email(mocker):
    mock_user_repo = mocker.patch("app.repositories.UserRepository")
    mock_user_repo.get_by_email.return_value = None

    mock_message_client = mocker.patch("app.messages.MessageClient")
    mock_security_manager = mocker.patch("app.security.SecurityManager")

    mock_usecase_input = mocker.patch(
        "app.usecases.authentication.SendResetPasswordLinkUseCaseInput"
    )

    usecase = SendResetPasswordLinkUseCase(
        user_repo=mock_user_repo,
        message_client=mock_message_client,
        security_manager=mock_security_manager,
    )

    with pytest.raises(UserNotFoundError):
        usecase.execute(mock_usecase_input)

    mock_user_repo.get_by_email.assert_called_once_with(mock_usecase_input.email)
    mock_security_manager.generate_reset_password_token.assert_not_called()
    mock_message_client.send.assert_not_called()


def test_reset_password_usecase(mocker):
    mock_user_entity = mocker.patch("app.entities.User")
    mock_user_repo = mocker.patch("app.repositories.UserRepository")
    mock_user_repo.get_by_email.return_value = mock_user_entity

    mock_message_client = mocker.patch("app.messages.MessageClient")
    mock_security_manager = mocker.patch("app.security.SecurityManager")
    mock_security_manager.check_reset_password_token.return_value = {
        "sub": "test@test.pl"
    }

    mock_security_manager.generate_password_hash.return_value = "password_hash"

    mock_usecase_input = mocker.patch(
        "app.usecases.authentication.ResetPasswordUseCaseInput"
    )

    usecase = ResetPasswordUseCase(
        user_repo=mock_user_repo,
        message_client=mock_message_client,
        security_manager=mock_security_manager,
    )
    usecase.execute(mock_usecase_input)

    mock_security_manager.check_reset_password_token.assert_called_once_with(
        mock_usecase_input.reset_password_token
    )
    mock_user_repo.get_by_email.assert_called_once_with("test@test.pl")
    mock_security_manager.generate_password_hash.assert_called_once_with(
        mock_usecase_input.password
    )
    mock_user_repo.save.assert_called_once_with(mock_user_entity)

    email_message = mock_message_client.send.call_args[0][0]
    assert email_message.title == "Cashly - Potwierdzenie zmiany hasła"
    assert email_message.recipients == [mock_user_entity.email]
    assert email_message.template_name == "password-recovery-success.html"


def test_reset_password_usecase_when_user_not_found_by_email(mocker):
    mock_user_repo = mocker.patch("app.repositories.UserRepository")
    mock_user_repo.get_by_email.return_value = None

    mock_message_client = mocker.patch("app.messages.MessageClient")
    mock_security_manager = mocker.patch("app.security.SecurityManager")
    mock_security_manager.check_reset_password_token.return_value = {
        "sub": "test@test.pl"
    }

    mock_usecase_input = mocker.patch(
        "app.usecases.authentication.ResetPasswordUseCase"
    )

    usecase = ResetPasswordUseCase(
        user_repo=mock_user_repo,
        message_client=mock_message_client,
        security_manager=mock_security_manager,
    )
    with pytest.raises(UserNotFoundError):
        usecase.execute(mock_usecase_input)

    mock_security_manager.check_reset_password_token.assert_called_once_with(
        mock_usecase_input.reset_password_token
    )
    mock_user_repo.get_by_email.assert_called_once_with("test@test.pl")
    mock_message_client.send.assert_not_called()
