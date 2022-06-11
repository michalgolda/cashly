from pydantic import BaseModel


class User(BaseModel):
    email: str


class UserCreate(User):
    password: str
