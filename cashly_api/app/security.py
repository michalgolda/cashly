import datetime
from abc import ABC, abstractmethod, abstractstaticmethod
from typing import TypedDict
from uuid import UUID

import bcrypt
import jwt
from fastapi import HTTPException, Request
from fastapi.security import HTTPBearer

from app.settings import settings


class TokenPayload(TypedDict):
    sub: UUID
    aud: str
    exp: datetime.datetime


class AccessTokenPayload(TokenPayload):
    ...


class ResetPasswordTokenPayload(TokenPayload):
    sub: str


class EmailVerificationTokenPayload(TokenPayload):
    sub: str


class SecurityManager(ABC):
    @abstractstaticmethod
    def generate_password_hash(password: str) -> str:
        ...

    @abstractstaticmethod
    def check_password_hash(password: str, hashed_password: str) -> bool:
        ...

    @abstractstaticmethod
    def generate_jwt_token(payload: dict) -> str:
        ...

    @abstractstaticmethod
    def check_jwt_token(token: str, audience: str) -> dict:
        ...

    @abstractmethod
    def generate_access_token(self, user_id: UUID) -> str:
        ...

    @abstractmethod
    def check_access_token(self, access_token: str) -> AccessTokenPayload:
        ...

    @abstractmethod
    def generate_reset_password_token(self, user_email: str) -> str:
        ...

    @abstractmethod
    def check_reset_password_token(
        self,
        reset_password_token: str,
    ) -> ResetPasswordTokenPayload:
        ...

    @abstractmethod
    def generate_email_verification_token(self, user_email: str) -> str:
        ...

    @abstractmethod
    def check_email_verification_token(
        self, email_verification_token: str
    ) -> EmailVerificationTokenPayload:
        ...


class DefaultSecurityManager(SecurityManager):
    @staticmethod
    def generate_password_hash(password: str) -> str:
        return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

    @staticmethod
    def check_password_hash(password: str, password_hash: str) -> bool:
        return bcrypt.checkpw(password.encode("utf-8"), password_hash.encode("utf-8"))

    @staticmethod
    def generate_jwt_token(payload):
        return jwt.encode(
            payload, settings.SECRET_KEY, algorithm=settings.JWT_TOKEN_ALGORITHM
        )

    @staticmethod
    def check_jwt_token(token: str, audience: str) -> dict:
        return jwt.decode(
            token.encode("utf-8"),
            settings.SECRET_KEY,
            settings.JWT_TOKEN_ALGORITHM,
            audience=audience,
        )

    def generate_access_token(self, user_id: UUID) -> str:
        payload = dict(
            sub=str(user_id),
            aud="access_token",
            exp=datetime.datetime.now(tz=datetime.timezone.utc)
            + datetime.timedelta(seconds=settings.ACCESS_TOKEN_EXPIRATION),
        )
        return self.generate_jwt_token(payload)

    def check_access_token(self, access_token: str) -> AccessTokenPayload:
        payload = self.check_jwt_token(access_token, "access_token")
        payload["sub"] = UUID(payload["sub"])
        payload["exp"] = datetime.datetime.fromtimestamp(payload["exp"])
        return payload

    def generate_reset_password_token(self, user_email: str) -> str:
        payload = dict(
            sub=user_email,
            aud="reset_password_token",
            exp=datetime.datetime.now(tz=datetime.timezone.utc)
            + datetime.timedelta(seconds=settings.RESET_PASSWORD_TOKEN_EXPIRATION),
        )
        return self.generate_jwt_token(payload)

    def check_reset_password_token(
        self, reset_password_token: str
    ) -> ResetPasswordTokenPayload:
        payload = self.check_jwt_token(reset_password_token, "reset_password_token")
        payload["exp"] = datetime.datetime.fromtimestamp(payload["exp"])
        return payload

    def generate_email_verification_token(self, user_email: str) -> str:
        payload = {
            "sub": user_email,
            "aud": "email_verification_token",
            "exp": datetime.datetime.now(tz=datetime.timezone.utc)
            + datetime.timedelta(seconds=settings.EMAIL_VERIFICATION_TOKEN_EXPIRATION),
        }
        return self.generate_jwt_token(payload)

    def check_email_verification_token(
        self, email_verification_token: str
    ) -> EmailVerificationTokenPayload:
        payload = self.check_jwt_token(
            email_verification_token, "email_verification_token"
        )
        payload["exp"] = datetime.datetime.fromtimestamp(payload["exp"])
        return payload


class HTTPAccessToken(HTTPBearer):
    def __init__(self, security_manager: SecurityManager):
        self._security_manager = security_manager
        super().__init__(scheme_name="AccessToken", auto_error=True)

    async def __call__(self, request: Request) -> AccessTokenPayload:
        http_authorization_credentials = await super().__call__(request)
        try:
            return self._security_manager.check_access_token(
                http_authorization_credentials.credentials
            )
        except jwt.exceptions.InvalidTokenError:
            raise HTTPException(
                status_code=401,
                detail="Kod autoryzacyjny stracił ważność lub jest błędny",
            )
