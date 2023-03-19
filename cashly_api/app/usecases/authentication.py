from dataclasses import dataclass
from typing import NoReturn, TypedDict, List

from app.entities import User, ExpenseCategory
from app.exceptions import (
    BadAuthenticationCredentialsError,
    UserEmailAlreadyUsedError,
    UserNotFoundError,
)
from app.messages import EmailMessage, MessageClient
from app.repositories import UserRepository, ExpenseCategoryRepository
from app.security import SecurityManager
from app.usecases import UseCase


class DefaultExpenseCategory(TypedDict):
    name: str
    color: str


@dataclass(frozen=True)
class RegisterUseCaseInput:
    email: str
    password: str
    default_expense_categories: List[DefaultExpenseCategory]


class RegisterUseCase(UseCase[RegisterUseCaseInput, NoReturn]):
    def __init__(
        self,
        user_repo: UserRepository,
        expense_category_repo: ExpenseCategoryRepository,
        security_manager: SecurityManager,
        message_client: MessageClient,
    ) -> NoReturn:
        self._user_repo = user_repo
        self._security_manager = security_manager
        self._message_client = message_client
        self._expense_category_repo = expense_category_repo

    def _check_email(self, email: str) -> NoReturn:
        existing_user = self._user_repo.get_by_email(email)
        if existing_user:
            raise UserEmailAlreadyUsedError()

    def _create_user(self, email: str, password: str) -> NoReturn:
        hashed_password = self._security_manager.generate_password_hash(password)
        user = User(email=email, password=hashed_password)
        self._user_repo.add(user)

    def _create_default_expense_categories(
        self, email: str, default_expense_categories: DefaultExpenseCategory
    ):
        user = self._user_repo.get_by_email(email)
        for expense_category in default_expense_categories:
            self._expense_category_repo.add(
                ExpenseCategory(
                    name=expense_category.get("name"),
                    color=expense_category.get("color"),
                    user=user,
                )
            )

    def _send_email_verification_token(self, email: str) -> NoReturn:
        email_verification_token = (
            self._security_manager.generate_email_verification_token(email)
        )
        self._message_client.send(
            EmailMessage(
                title="Cashly - Konto zostało pomyślnie utworzone",
                recipients=[email],
                template_name="welcome-new-user.html",
                payload={"email_verification_token": email_verification_token},
            )
        )

    def execute(self, input: RegisterUseCaseInput) -> NoReturn:
        email = input.email
        password = input.password
        default_expense_categories = input.default_expense_categories

        self._create_user(email, password)
        self._create_default_expense_categories(email, default_expense_categories)
        self._send_email_verification_token(email)


@dataclass(frozen=True)
class LoginUseCaseInput:
    email: str
    password: str


@dataclass(frozen=True)
class LoginUseCaseOutput:
    access_token: str


class LoginUseCase(UseCase[LoginUseCaseInput, LoginUseCaseOutput]):
    def __init__(
        self, user_repo: UserRepository, security_manager: SecurityManager
    ) -> NoReturn:
        self._user_repo = user_repo
        self._security_manager = security_manager

    def _get_existing_user(self, email: str) -> User:
        existing_user = self._user_repo.get_by_email(email)
        if not existing_user:
            raise BadAuthenticationCredentialsError()
        return existing_user

    def _check_password(self, plain_password: str, password_hash: str) -> NoReturn:
        if not self._security_manager.check_password_hash(
            plain_password, password_hash
        ):
            raise BadAuthenticationCredentialsError()

    def execute(self, input: LoginUseCaseInput) -> LoginUseCaseOutput:
        existing_user = self._get_existing_user(email=input.email)

        self._check_password(
            plain_password=input.password, password_hash=existing_user.password
        )

        access_token = self._security_manager.generate_access_token(existing_user.id)
        return LoginUseCaseOutput(access_token)


@dataclass(frozen=True)
class SendResetPasswordLinkUseCaseInput:
    email: str


class SendResetPasswordLinkUseCase(
    UseCase[SendResetPasswordLinkUseCaseInput, NoReturn]
):
    def __init__(
        self,
        user_repo: UserRepository,
        message_client: MessageClient,
        security_manager: SecurityManager,
    ) -> None:
        self._user_repo = user_repo
        self._message_client = message_client
        self._security_manager = security_manager

    def execute(self, input: SendResetPasswordLinkUseCaseInput) -> NoReturn:
        existing_user = self._user_repo.get_by_email(input.email)
        if not existing_user:
            raise UserNotFoundError()

        reset_password_token = self._security_manager.generate_reset_password_token(
            existing_user.email
        )

        self._message_client.send(
            EmailMessage(
                title="Cashly - Resetowanie hasła",
                recipients=[existing_user.email],
                template_name="password-recovery-request.html",
                payload={"password_recovery_token": reset_password_token},
            )
        )


@dataclass(frozen=True)
class ResetPasswordUseCaseInput:
    password: str
    reset_password_token: str


class ResetPasswordUseCase(UseCase[ResetPasswordUseCaseInput, NoReturn]):
    def __init__(
        self,
        user_repo: UserRepository,
        message_client: MessageClient,
        security_manager: SecurityManager,
    ) -> None:
        self._user_repo = user_repo
        self._message_client = message_client
        self._security_manager = security_manager

    def execute(self, input: ResetPasswordUseCaseInput) -> NoReturn:
        reset_password_token_payload = (
            self._security_manager.check_reset_password_token(
                input.reset_password_token
            )
        )
        email = reset_password_token_payload.get("sub")
        existing_user = self._user_repo.get_by_email(email)
        if not existing_user:
            raise UserNotFoundError()

        existing_user.password = self._security_manager.generate_password_hash(
            input.password
        )

        self._user_repo.save(existing_user)

        self._message_client.send(
            EmailMessage(
                title="Cashly - Hasło zostało pomyślnie zmienione!",
                recipients=[existing_user.email],
                template_name="password-recovery-success.html",
            )
        )
