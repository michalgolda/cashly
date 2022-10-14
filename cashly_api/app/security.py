import jwt
import bcrypt
import datetime
from uuid import UUID
from typing import Optional
from dataclasses import dataclass
from abc import ABC, abstractmethod, abstractstaticmethod

from app.settings import settings

from fastapi import HTTPException, Request
from fastapi.security import HTTPBearer


@dataclass(frozen=True)
class AccessTokenPayload:
  sub: UUID
  exp: datetime.datetime


class SecurityManager(ABC):
  @abstractmethod
  def generate_access_token(self, subject: str, expiration: int = 1800) -> str: ...

  @abstractmethod
  def verify_access_token(self, access_token: str) -> AccessTokenPayload: ...

  @abstractstaticmethod
  def generate_password_hash(password: str) -> str: ...

  @abstractstaticmethod
  def verify_password_hash(password: str, hashed_password: str) -> bool: ...

  @abstractmethod
  def generate_reset_password_token(self, email: str) -> str: ...

  @abstractmethod
  def verify_reset_password_token(self, token: str) -> str: ...


class DefaultSecurityManager(SecurityManager):
  @staticmethod
  def generate_password_hash(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')  

  @staticmethod
  def verify_password_hash(password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8'))

  @staticmethod
  def generate_jwt_token(payload) -> str:
    return jwt.encode(
      dict(
        type=payload.get('type'),
        sub=payload.get('sub'),
        exp=payload.get('exp')
      ),
      settings.SECRET_KEY,
      algorithm=settings.ACCESS_TOKEN_ALGORITHM
    )

  @staticmethod
  def verify_jwt_token(token: str, type: str):
    decoded_payload = jwt.decode(token.encode('utf-8'), settings.SECRET_KEY, settings.ACCESS_TOKEN_ALGORITHM)
    return AccessTokenPayload(
      sub=UUID(decoded_payload['sub']),
      exp=datetime.datetime.fromtimestamp(decoded_payload['exp'])
    ) 
    
class HTTPAccessToken(HTTPBearer):
  def __init__(self, security_manager: SecurityManager):
    self._security_manager = security_manager
    super().__init__(scheme_name='AccessToken', auto_error=True)

  async def __call__(self, request: Request) -> Optional[AccessTokenPayload]:
    http_authorization_credentials = await super().__call__(request)
    try:
      return self._security_manager.verify_access_token(http_authorization_credentials.credentials)
    except jwt.exceptions.InvalidTokenError:
      raise HTTPException(status_code=401, detail='Kod autoryzacyjny stracił ważność lub jest błędny')

      

