from uuid import UUID
from datetime import date
from typing import Optional
from dataclasses import dataclass

from .user import User


@dataclass
class ExpenseCategory:
    name: str
    color: str
    user: User
    id: Optional[UUID] = None
    created_at: Optional[date] = None
    updated_at: Optional[date] = None
