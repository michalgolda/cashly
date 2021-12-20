from uuid import UUID
from datetime import datetime

from pydantic import BaseModel


class ExpenseCategory(BaseModel):
    name: str
    color: str


class ExpenseCategoryCreate(ExpenseCategory):
    pass


class ExpenseCategoryUpdate(ExpenseCategory):
    pass


class ExpenseCategoryOut(ExpenseCategory):
    id: UUID
    created_at: datetime
    updated_at: datetime = None

    class Config:
        orm_mode = True
