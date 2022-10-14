import pytest

from app.entities import User
from app.exceptions import BadAuthenticationCredentialsError, UserEmailAlreadyUsedError, UserNotFoundError
from app.usecases.authentication import LoginUseCase, RegisterUseCase, ResetPasswordUseCase, SendResetPasswordLinkUseCase


def test_register(mocker):
  mock_user_repo = mocker.patch('app.repositories.UserRepository')
  mock_user_repo.get_by_email.return_value = None
  
  mock_security_manager = mocker.patch('app.security.SecurityManager')
  mock_security_manager.generate_password_hash.return_value = 'hashed password'
  
  mock_register_usecase_input = mocker.patch('app.usecases.authentication.RegisterUseCaseInput')

  register_usecase = RegisterUseCase(user_repo=mock_user_repo, security_manager=mock_security_manager)
  register_usecase.execute(mock_register_usecase_input)

  mock_user_repo.get_by_email.assert_called_once_with(mock_register_usecase_input.email)
  mock_user_repo.add.assert_called_once_with(
    User(
      email=mock_register_usecase_input.email, 
      password='hashed password'
    )
  )
  mock_security_manager.generate_password_hash.assert_called_once_with(mock_register_usecase_input.password)

def test_register_excpetion_when_user_email_is_already_used(mocker):
  mock_user_repo = mocker.patch('app.repositories.UserRepository')
  mock_security_manager = mocker.patch('app.security.SecurityManager')
  mock_register_usecase_input = mocker.patch('app.usecases.authentication.RegisterUseCaseInput')
  
  register_usecase = RegisterUseCase(user_repo=mock_user_repo, security_manager=mock_security_manager)

  with pytest.raises(UserEmailAlreadyUsedError):
    register_usecase.execute(mock_register_usecase_input)

  mock_user_repo.get_by_email.assert_called_once_with(mock_register_usecase_input.email)

def test_login(mocker):
  mock_user_entity = mocker.patch('app.entities.User')
  mock_user_repo = mocker.patch('app.repositories.UserRepository')
  mock_user_repo.get_by_email.return_value = mock_user_entity

  mock_security_manager = mocker.patch('app.security.SecurityManager')
  mock_security_manager.verify_password_hash.return_value = True
  mock_security_manager.generate_access_token.return_value = 'access token'

  mock_login_usecase_input = mocker.patch('app.usecases.authentication.LoginUseCaseInput')

  login_usecase = LoginUseCase(user_repo=mock_user_repo, security_manager=mock_security_manager)
  login_usecase_output = login_usecase.execute(mock_login_usecase_input)
  
  assert login_usecase_output.access_token == 'access token'

  mock_user_repo.get_by_email.assert_called_once_with(mock_login_usecase_input.email)
  mock_security_manager.verify_password_hash.assert_called_once_with(
    mock_login_usecase_input.password,
    mock_user_entity.password, 
  )
  mock_security_manager.generate_access_token.assert_called_once_with(mock_user_entity.id)

def test_login_excpetion_when_user_email_is_wrong(mocker):
  mock_user_repo = mocker.patch('app.repositories.UserRepository')
  mock_user_repo.get_by_email.return_value = None

  mock_security_manager = mocker.patch('app.security.SecurityManager')
  mock_login_usecase_input = mocker.patch('app.usecases.authentication.LoginUseCaseInput')

  login_usecase = LoginUseCase(user_repo=mock_user_repo, security_manager=mock_security_manager)

  with pytest.raises(BadAuthenticationCredentialsError):
    login_usecase.execute(mock_login_usecase_input)

  mock_user_repo.get_by_email.assert_called_once_with(mock_login_usecase_input.email)

def test_login_excpetion_when_user_password_is_wrong(mocker):
  mock_user_entity = mocker.patch('app.entities.User')
  mock_user_repo = mocker.patch('app.repositories.UserRepository')
  mock_user_repo.get_by_email.return_value = mock_user_entity

  mock_security_manager = mocker.patch('app.security.SecurityManager')
  mock_security_manager.verify_password_hash.return_value = False

  mock_login_usecase_input = mocker.patch('app.usecases.authentication.LoginUseCaseInput')

  login_usecase = LoginUseCase(user_repo=mock_user_repo, security_manager=mock_security_manager)

  with pytest.raises(BadAuthenticationCredentialsError):
    login_usecase.execute(mock_login_usecase_input)

  mock_user_repo.get_by_email.assert_called_once_with(mock_login_usecase_input.email)
  mock_security_manager.verify_password_hash.assert_called_once_with(
    mock_user_entity.password, 
    mock_login_usecase_input.password
  )

def test_send_reset_password_link(mocker):
  mock_user_entity = mocker.patch('app.entities.User')
  mock_user_repo = mocker.patch('app.repositories.UserRepository')
  mock_user_repo.get_by_email.return_value = mock_user_entity

  mock_message = mocker.patch('app.messages.EmailMessage')
  mock_security_manager = mocker.patch('app.security.SecurityManager')
  mock_security_manager.generate_reset_password_token.return_value = 'RESET_PASSWORD_TOKEN'

  mock_usecase_input = mocker.patch('app.usecases.authentication.SendResetPasswordLinkInput')
  usecase = SendResetPasswordLinkUseCase(
    user_repo=mock_user_repo, 
    message=mock_message, 
    security_manager=mock_security_manager
  ) 
  usecase.execute(mock_usecase_input)

  mock_user_repo.get_by_email.assert_called_once_with(mock_usecase_input.email)
  mock_security_manager.generate_reset_password_token.assert_called_once_with(mock_user_entity.email)
  mock_message.set_recipment.assert_called_once_with(mock_user_entity.email)
  mock_message.set_payload.assert_called_once_with(dict(email=mock_user_entity.email, token='RESET_PASSWORD_TOKEN'))
  mock_message.send.assert_called_once()

def test_send_reset_password_link_when_user_not_found(mocker):
  mock_user_repo = mocker.patch('app.repositories.UserRepository')
  mock_user_repo.get_by_email.return_value = None

  mock_message = mocker.patch('app.messages.EmailMessage')
  mock_security_manager = mocker.patch('app.security.SecurityManager')

  mock_usecase_input = mocker.patch('app.usecases.authentication.SendResetPasswordLinkInput')
  usecase = SendResetPasswordLinkUseCase(
    user_repo=mock_user_repo, 
    message=mock_message,
    security_manager=mock_security_manager
  ) 
  with pytest.raises(UserNotFoundError):
    usecase.execute(mock_usecase_input)

  mock_user_repo.get_by_email.assert_called_once_with(mock_usecase_input.email)
  mock_security_manager.generate_reset_password_token.assert_not_called()
  mock_message.set_recipment.assert_not_called()
  mock_message.set_payload.assert_not_called()
  mock_message.send.assert_not_called()

def test_reset_password(mocker):
  mock_user_entity = mocker.patch('app.entities.User')
  mock_user_repo = mocker.patch('app.repositories.UserRepository')
  mock_user_repo.get_by_email.return_value = mock_user_entity
  
  mock_security_manager = mocker.patch('app.security.SecurityManager')
  mock_security_manager.verify_reset_password_token.return_value = 'test@test.pl'

  mock_usecase_input = mocker.patch('app.usecases.authentication.ResetPasswordUseCase')
  usecase = ResetPasswordUseCase(
    user_repo=mock_user_repo,
    security_manager=mock_security_manager
  )
  usecase.execute(mock_usecase_input)

  mock_security_manager.verify_reset_password_token.assert_called_once_with(mock_usecase_input.token)
  mock_user_repo.get_by_email.assert_called_once_with('test@test.pl')
  mock_security_manager.generate_password_hash.assert_called_once_with(mock_usecase_input.password)
