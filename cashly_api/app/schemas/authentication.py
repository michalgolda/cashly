from curses.ascii import EM
from lib2to3.pytree import Base
from pydantic import BaseModel, EmailStr


class AuthenticationCredentials(BaseModel):
  email: EmailStr
  password: str