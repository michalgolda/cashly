from dataclasses import dataclass
from typing import NoReturn
from uuid import UUID

from app.entities import User
from app.exceptions import UserNotFoundError
from app.messages import EmailMessage, MessageClient
from app.repositories import UserRepository
from app.security import SecurityManager
from app.usecases import UseCase


@dataclass(frozen=True)
class GetUserByIdUseCaseInput:
    user_id: UUID


@dataclass(frozen=True)
class GetUserByIdUseCaseOutput:
    user: User


class GetUserByIdUseCase(UseCase[GetUserByIdUseCaseInput, GetUserByIdUseCaseOutput]):
    def __init__(self, user_repo: UserRepository) -> None:
        self._user_repo = user_repo

    def execute(self, input: GetUserByIdUseCaseInput) -> GetUserByIdUseCaseOutput:
        exisitng_user = self._user_repo.get_by_id(input.user_id)
        if not exisitng_user:
            raise UserNotFoundError()
        return GetUserByIdUseCaseOutput(exisitng_user)


@dataclass(frozen=True)
class VerifyEmailUseCaseInput:
    email_verification_token: str


class VerifyEmailUseCase(UseCase[VerifyEmailUseCaseInput, NoReturn]):
    def __init__(
        self,
        user_repo: UserRepository,
        security_manager: SecurityManager,
        message_client: MessageClient,
    ):
        self._user_repo = user_repo
        self._security_manager = security_manager
        self._message_client = message_client

    def _check_email_verification_token(self, email_verification_token: str) -> str:
        payload = self._security_manager.check_email_verification_token(
            email_verification_token
        )
        email = payload.get("sub")
        return email

    def _change_user_email_is_verified_flag(self, email: str) -> NoReturn:
        existing_user = self._user_repo.get_by_email(email)
        existing_user.email_is_verified = True
        self._user_repo.save(existing_user)

    def _send_message(self, email: str) -> NoReturn:
        self._message_client.send(
            EmailMessage(
                "Cashly - Potwierdzenie weryfikacji adresu e-mail",
                [email],
                "email-verification-success.html",
            )
        )

    def execute(self, input: VerifyEmailUseCaseInput) -> NoReturn:
        email = self._check_email_verification_token(input.email_verification_token)
        self._change_user_email_is_verified_flag(email)
        self._send_message(email)


@dataclass(frozen=True)
class SendEmailVerificationRequestUseCaseInput:
    email: str


class SendEmailVerificationRequestUseCase(
    UseCase[SendEmailVerificationRequestUseCaseInput, NoReturn]
):
    def __init__(
        self,
        user_repo: UserRepository,
        security_manager: SecurityManager,
        message_client: MessageClient,
    ):
        self._user_repo = user_repo
        self._security_manager = security_manager
        self._message_client = message_client

    def _get_existing_user(self, email: str) -> User:
        existing_user = self._user_repo.get_by_email(email)
        if not existing_user:
            raise UserNotFoundError()
        return existing_user

    def _send_email_verification_token(self, email: str) -> None:
        email_verification_token = (
            self._security_manager.generate_email_verification_token(email)
        )
        self._message_client.send(
            EmailMessage(
                "Cashly - Weryfikacja adresu email!",
                [email],
                "email-verification-request.html",
                {"email_verification_token": email_verification_token},
            )
        )

    def execute(self, input: SendEmailVerificationRequestUseCaseInput) -> NoReturn:
        email = input.email
        existing_user = self._get_existing_user(email)
        if not existing_user.email_is_verified:
            self._send_email_verification_token(email)
