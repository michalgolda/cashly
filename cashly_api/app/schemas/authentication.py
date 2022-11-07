from pydantic import BaseModel, EmailStr


class AuthenticationCredentials(BaseModel):
  email: EmailStr
  password: str


class ForgotPasswordPayload(BaseModel):
  email: EmailStr


class ResetPasswordPayload(BaseModel):
  password: str
  password_reset_token: str

