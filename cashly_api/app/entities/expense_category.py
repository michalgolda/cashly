from dataclasses import dataclass
from datetime import date
from typing import Optional
from uuid import UUID

from .user import User


@dataclass
class ExpenseCategory:
    name: str
    color: str
    user: User
    id: Optional[UUID] = None
    created_at: Optional[date] = None
    updated_at: Optional[date] = None
