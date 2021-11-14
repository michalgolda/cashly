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
    id: str
    created_at: datetime
    updated_at: datetime = None

    class Config:
        orm_mode = True


class Expense(BaseModel):
    amount: int


class ExpenseCreate(Expense):
    expense_category_id: str = None


class ExpenseUpdate(Expense):
    amount: int
    expense_category_id: str = None


class ExpenseOut(Expense):
    id: str
    created_at: datetime
    updated_at: datetime = None
    expense_category: ExpenseCategoryOut = None

    class Config:
        orm_mode = True
