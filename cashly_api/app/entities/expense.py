from uuid import UUID
from typing import Optional
from dataclasses import dataclass
from datetime import date, datetime

from .user import User
from .expense_category import ExpenseCategory


@dataclass
class Expense:
    user: User
    amount: float
    realised_date: date
    id: Optional[UUID] = None
    category: Optional[ExpenseCategory] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
