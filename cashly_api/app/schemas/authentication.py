from pydantic import BaseModel, EmailStr


class AuthenticationCredentials(BaseModel):
    email: EmailStr
    password: str


class PasswordRecoveryRequestPayload(BaseModel):
    email: EmailStr


class PasswordRecoveryProceedPayload(BaseModel):
    password: str
    password_recovery_token: str
