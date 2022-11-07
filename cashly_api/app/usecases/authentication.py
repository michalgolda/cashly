from typing import NoReturn
from dataclasses import dataclass

from app.entities import User
from app.usecases import UseCase
from app.messages import EmailMessage
from app.security import SecurityManager
from app.repositories import UserRepository
from app.exceptions import UserEmailAlreadyUsedError, BadAuthenticationCredentialsError, UserNotFoundError


@dataclass(frozen=True)
class RegisterUseCaseInput:
  email: str
  password: str


class RegisterUseCase(UseCase[RegisterUseCaseInput, NoReturn]):
  def __init__(self, user_repo: UserRepository, security_manager: SecurityManager) -> NoReturn:
    self._user_repo = user_repo
    self._security_manager = security_manager

  def execute(self, input: RegisterUseCaseInput) -> NoReturn:
    existing_user = self._user_repo.get_by_email(input.email)
    if existing_user:
      raise UserEmailAlreadyUsedError()

    hashed_password = self._security_manager.generate_password_hash(input.password)
    user = User(email=input.email, password=hashed_password)
    self._user_repo.add(user)


@dataclass(frozen=True)
class LoginUseCaseInput:
  email: str
  password: str


@dataclass(frozen=True)
class LoginUseCaseOutput:
  access_token: str


class LoginUseCase(UseCase[LoginUseCaseInput, LoginUseCaseOutput]):
  def __init__(self, user_repo: UserRepository, security_manager: SecurityManager) -> NoReturn:
    self._user_repo = user_repo
    self._security_manager = security_manager

  def execute(self, input: LoginUseCaseInput) -> LoginUseCaseOutput:
    existing_user = self._user_repo.get_by_email(input.email)
    if not existing_user:
      raise BadAuthenticationCredentialsError()

    if not self._security_manager.check_password_hash(input.password, existing_user.password):
      raise BadAuthenticationCredentialsError()

    access_token = self._security_manager.generate_access_token(existing_user.id)
    return LoginUseCaseOutput(access_token)


@dataclass(frozen=True)
class SendResetPasswordLinkUseCaseInput:
  email: str


class SendResetPasswordLinkUseCase(UseCase[SendResetPasswordLinkUseCaseInput, NoReturn]):
  def __init__(self, user_repo: UserRepository, message: EmailMessage, security_manager: SecurityManager) -> None:
    self._user_repo = user_repo
    self._message = message
    self._security_manager = security_manager

  def execute(self, input: SendResetPasswordLinkUseCaseInput) -> NoReturn:
    existing_user = self._user_repo.get_by_email(input.email)
    if not existing_user:
      raise UserNotFoundError()

    password_reset_token = self._security_manager.generate_reset_password_token(existing_user.email)

    self._message.set_recipment(existing_user.email)
    self._message.set_payload({ 
      'email': existing_user.email, 
      'password_reset_token': password_reset_token 
    })
    self._message.send()


@dataclass(frozen=True)
class ResetPasswordUseCaseInput:
  password: str
  password_reset_token: str

class ResetPasswordUseCase(UseCase[ResetPasswordUseCaseInput, NoReturn]):
  def __init__(self, user_repo: UserRepository, security_manager: SecurityManager) -> None:
    self._user_repo = user_repo
    self._security_manager = security_manager

  def execute(self, input: ResetPasswordUseCaseInput) -> NoReturn:
    password_reset_token_payload = self._security_manager.check_password_reset_token(input.password_reset_token)
    email = password_reset_token_payload.get('sub')
    existing_user = self._user_repo.get_by_email(email)
    if not existing_user:
      raise UserNotFoundError()

    existing_user.password = self._security_manager.generate_password_hash(input.password)

    self._user_repo.save(existing_user)
    