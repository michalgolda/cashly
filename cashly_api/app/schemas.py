from datetime import datetime

from pydantic import BaseModel


class ExpenseCategory(BaseModel):
    name: str
    color: str = "#000"

    class Config:
        orm_mode = True


class ExpenseCategoryCreate(ExpenseCategory):
    pass


class ExpenseCategoryOut(ExpenseCategory):
    id: str
    created_at: datetime
    updated_at: datetime = None


class Expense(BaseModel):
    amount: int

    class Config:
        orm_mode = True


class ExpenseCreate(Expense):
    expense_category_id: str = None


class ExpenseOut(Expense):
    id: str
    created_at: datetime
    updated_at: datetime = None
    expense_category: ExpenseCategoryOut = None
