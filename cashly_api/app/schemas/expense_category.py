from uuid import UUID
from datetime import datetime
from typing import Optional

from pydantic import BaseModel

from .user import User



class ExpenseCategory(BaseModel):
    name: str
    color: str
    user: User


class ExpenseCategoryCreate(BaseModel):
    name: str
    color: str


class ExpenseCategoryUpdate(BaseModel):
    name: str
    color: str


class ExpenseCategoryOut(BaseModel):
    name: str
    color: str
    updated_at: datetime = None
    id: Optional[UUID]
    created_at: Optional[datetime]

    class Config:
        orm_mode = True
