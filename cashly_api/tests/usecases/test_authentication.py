import pytest

from app.entities import User
from app.exceptions import BadAuthenticationCredentialsError, UserEmailAlreadyUsedError, UserNotFoundError
from app.usecases.authentication import LoginUseCase, RegisterUseCase, ResetPasswordUseCase, SendResetPasswordLinkUseCase


def test_register_usecase(mocker):
  mock_user_repo = mocker.patch('app.repositories.UserRepository')
  mock_user_repo.get_by_email.return_value = None
  
  mock_security_manager = mocker.patch('app.security.SecurityManager')
  mock_security_manager.generate_password_hash.return_value = 'password_hash'
  
  mock_usecase_input = mocker.patch('app.usecases.authentication.RegisterUseCaseInput')

  usecase = RegisterUseCase(
    user_repo=mock_user_repo, 
    security_manager=mock_security_manager
  )
  usecase.execute(mock_usecase_input)

  mock_user_repo.get_by_email.assert_called_once_with(mock_usecase_input.email)
  mock_user_repo.add.assert_called_once_with(
    User(
      email=mock_usecase_input.email, 
      password='password_hash'
    )
  )
  mock_security_manager.generate_password_hash.assert_called_once_with(mock_usecase_input.password)

def test_register_usecase_when_user_email_is_already_used(mocker):
  mock_user_repo = mocker.patch('app.repositories.UserRepository')
  mock_security_manager = mocker.patch('app.security.SecurityManager')
  mock_usecase_input = mocker.patch('app.usecases.authentication.RegisterUseCaseInput')
  
  usecase = RegisterUseCase(
    user_repo=mock_user_repo, 
    security_manager=mock_security_manager
  )

  with pytest.raises(UserEmailAlreadyUsedError):
    usecase.execute(mock_usecase_input)

  mock_user_repo.get_by_email.assert_called_once_with(mock_usecase_input.email)

def test_login_usecase(mocker):
  mock_user_entity = mocker.patch('app.entities.User')
  mock_user_repo = mocker.patch('app.repositories.UserRepository')
  mock_user_repo.get_by_email.return_value = mock_user_entity

  mock_security_manager = mocker.patch('app.security.SecurityManager')
  mock_security_manager.check_password_hash.return_value = True
  mock_security_manager.generate_access_token.return_value = 'access_token'

  mock_usecase_input = mocker.patch('app.usecases.authentication.LoginUseCaseInput')

  usecase = LoginUseCase(
    user_repo=mock_user_repo, 
    security_manager=mock_security_manager
  )
  usecase_output = usecase.execute(mock_usecase_input)
  
  assert usecase_output.access_token == 'access_token'

  mock_user_repo.get_by_email.assert_called_once_with(mock_usecase_input.email)
  mock_security_manager.check_password_hash.assert_called_once_with(
    mock_usecase_input.password,
    mock_user_entity.password, 
  )
  mock_security_manager.generate_access_token.assert_called_once_with(mock_user_entity.id)

def test_login_usecase_when_user_not_found_by_email(mocker):
  mock_user_repo = mocker.patch('app.repositories.UserRepository')
  mock_user_repo.get_by_email.return_value = None

  mock_security_manager = mocker.patch('app.security.SecurityManager')
  mock_usecase_input = mocker.patch('app.usecases.authentication.LoginUseCaseInput')

  usecase = LoginUseCase(
    user_repo=mock_user_repo, 
    security_manager=mock_security_manager
  )

  with pytest.raises(BadAuthenticationCredentialsError):
    usecase.execute(mock_usecase_input)

  mock_user_repo.get_by_email.assert_called_once_with(mock_usecase_input.email)

def test_login_usecase_when_user_password_is_wrong(mocker):
  mock_user_entity = mocker.patch('app.entities.User')
  mock_user_repo = mocker.patch('app.repositories.UserRepository')
  mock_user_repo.get_by_email.return_value = mock_user_entity

  mock_security_manager = mocker.patch('app.security.SecurityManager')
  mock_security_manager.check_password_hash.return_value = False

  mock_usecase_input = mocker.patch('app.usecases.authentication.LoginUseCaseInput')

  usecase = LoginUseCase(
    user_repo=mock_user_repo, 
    security_manager=mock_security_manager
  )

  with pytest.raises(BadAuthenticationCredentialsError):
    usecase.execute(mock_usecase_input)

  mock_user_repo.get_by_email.assert_called_once_with(mock_usecase_input.email)
  mock_security_manager.check_password_hash.assert_called_once_with(
    mock_usecase_input.password,
    mock_user_entity.password
  )

def test_send_reset_password_link_usecase(mocker):
  mock_user_entity = mocker.patch('app.entities.User')
  mock_user_repo = mocker.patch('app.repositories.UserRepository')
  mock_user_repo.get_by_email.return_value = mock_user_entity

  mock_message = mocker.patch('app.messages.EmailMessage')
  mock_security_manager = mocker.patch('app.security.SecurityManager')
  mock_security_manager.generate_reset_password_token.return_value = 'password_reset_token'

  mock_usecase_input = mocker.patch('app.usecases.authentication.SendResetPasswordLinkUseCaseInput')
  
  usecase = SendResetPasswordLinkUseCase(
    message=mock_message, 
    user_repo=mock_user_repo, 
    security_manager=mock_security_manager
  ) 
  usecase.execute(mock_usecase_input)

  mock_user_repo.get_by_email.assert_called_once_with(mock_usecase_input.email)
  mock_security_manager.generate_reset_password_token.assert_called_once_with(mock_user_entity.email)
  mock_message.set_recipment.assert_called_once_with(mock_user_entity.email)
  mock_message.set_payload.assert_called_once_with({ 
    "email": mock_user_entity.email, 
    "password_reset_token": 'password_reset_token'
  })
  mock_message.send.assert_called_once()

def test_send_reset_password_link_usecase_when_user_not_found_by_email(mocker):
  mock_user_repo = mocker.patch('app.repositories.UserRepository')
  mock_user_repo.get_by_email.return_value = None

  mock_message = mocker.patch('app.messages.EmailMessage')
  mock_security_manager = mocker.patch('app.security.SecurityManager')

  mock_usecase_input = mocker.patch('app.usecases.authentication.SendResetPasswordLinkUseCaseInput')
  
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

def test_reset_password_usecase(mocker):
  mock_user_entity = mocker.patch('app.entities.User')
  mock_user_repo = mocker.patch('app.repositories.UserRepository')
  mock_user_repo.get_by_email.return_value = mock_user_entity
  
  mock_security_manager = mocker.patch('app.security.SecurityManager')
  mock_security_manager.check_password_reset_token.return_value = {"sub": "test@test.pl"}

  mock_security_manager.generate_password_hash.return_value = 'password_hash'

  mock_usecase_input = mocker.patch('app.usecases.authentication.ResetPasswordUseCaseInput')
  
  usecase = ResetPasswordUseCase(
    user_repo=mock_user_repo,
    security_manager=mock_security_manager
  )
  usecase.execute(mock_usecase_input)

  mock_security_manager.check_password_reset_token.assert_called_once_with(mock_usecase_input.password_reset_token)
  mock_user_repo.get_by_email.assert_called_once_with("test@test.pl")
  mock_security_manager.generate_password_hash.assert_called_once_with(mock_usecase_input.password)
  mock_user_repo.save.assert_called_once_with(mock_user_entity)

def test_reset_password_usecase_when_user_not_found_by_email(mocker):
  mock_user_repo = mocker.patch('app.repositories.UserRepository')
  mock_user_repo.get_by_email.return_value = None
  
  mock_security_manager = mocker.patch('app.security.SecurityManager')
  mock_security_manager.check_password_reset_token.return_value = {"sub": "test@test.pl"}

  mock_usecase_input = mocker.patch('app.usecases.authentication.ResetPasswordUseCase')
  
  usecase = ResetPasswordUseCase(
    user_repo=mock_user_repo,
    security_manager=mock_security_manager
  )
  with pytest.raises(UserNotFoundError):
    usecase.execute(mock_usecase_input)

  mock_security_manager.check_password_reset_token.assert_called_once_with(mock_usecase_input.password_reset_token)
  mock_user_repo.get_by_email.assert_called_once_with("test@test.pl")
