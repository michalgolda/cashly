from uuid import UUID
from datetime import datetime

from pydantic import BaseModel


class User(BaseModel):
    first_name: str
    last_name: str
    email: str


class UserCreate(User):
    password: str
