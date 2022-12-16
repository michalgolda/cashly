from datetime import date
from typing import Optional
from uuid import UUID

from app.schemas.expense_category import ExpenseCategoryOut
from pydantic import BaseModel


class Expense(BaseModel):
    amount: float
    realised_date: date


class ExpenseCreate(Expense):
    expense_category_id: UUID = None


class ExpenseUpdate(Expense):
    expense_category_id: UUID = None


class ExpenseOut(BaseModel):
    id: Optional[UUID]
    amount: float
    realised_date: date
    category: ExpenseCategoryOut = None

    class Config:
        orm_mode = True
