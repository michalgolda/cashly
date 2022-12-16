from fastapi import Depends
from fastapi_mail import ConnectionConfig as FMConnectionConfig
from fastapi_mail import FastMail

from app.database import session
from app.entities import User
from app.messages import EmailMessageClient, MessageClient
from app.repositories import (
    ExpenseRepository,
    SQLAlchemyExpenseCategoryRepository,
    SQLAlchemyExpenseRepository,
    SQLAlchemyUserRepository,
    UserRepository,
)
from app.security import (
    AccessTokenPayload,
    DefaultSecurityManager,
    HTTPAccessToken,
    SecurityManager,
)
from app.settings import settings


def get_expense_repo() -> ExpenseRepository:
    return SQLAlchemyExpenseRepository(session)


def get_expense_category_repo():
    return SQLAlchemyExpenseCategoryRepository(session)


def get_user_repo() -> UserRepository:
    return SQLAlchemyUserRepository(session)


def get_security_manager() -> SecurityManager:
    return DefaultSecurityManager()


def get_current_user(
    user_repo: UserRepository = Depends(get_user_repo),
    access_token_payload: AccessTokenPayload = Depends(
        HTTPAccessToken(security_manager=get_security_manager())
    ),
) -> User:
    return user_repo.get_by_id(access_token_payload.get("sub"))


def get_email_message_client() -> EmailMessageClient:
    conf = FMConnectionConfig(
        MAIL_USERNAME=settings.MAIL_USERNAME,
        MAIL_PASSWORD=settings.MAIL_PASSWORD,
        MAIL_FROM=settings.MAIL_FROM,
        MAIL_PORT=settings.MAIL_PORT,
        MAIL_SERVER=settings.MAIL_SERVER,
        MAIL_STARTTLS=settings.MAIL_STARTTLS,
        MAIL_SSL_TLS=settings.MAIL_SSL_TLS,
        USE_CREDENTIALS=settings.MAIL_USE_CREDENTIALS,
        VALIDATE_CERTS=settings.MAIL_VALIDATE_CERTS,
    )
    fm = FastMail(conf)

    return EmailMessageClient(fm)


def get_message_client() -> MessageClient:
    return get_email_message_client()
