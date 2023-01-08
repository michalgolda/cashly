from uuid import UUID

from pydantic import BaseModel


class User(BaseModel):
    id: UUID
    email: str
    email_is_verified: bool


class UserOut(User):
    ...


class VerifyEmailPayload(BaseModel):
    email_verification_token: str


class SendEmailVerificationRequestPayload(BaseModel):
    email: str
