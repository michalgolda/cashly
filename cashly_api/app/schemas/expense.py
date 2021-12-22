from uuid import UUID
from datetime import datetime, date

from pydantic import BaseModel

from app.schemas.expense_category import ExpenseCategoryOut


class Expense(BaseModel):
    amount: float
    realised_date: date


class ExpenseCreate(Expense):
    expense_category_id: UUID = None


class ExpenseUpdate(Expense):
    expense_category_id: UUID = None


class ExpenseOut(Expense):
    id: UUID
    created_at: datetime
    updated_at: datetime = None
    category: ExpenseCategoryOut = None

    class Config:
        orm_mode = True
