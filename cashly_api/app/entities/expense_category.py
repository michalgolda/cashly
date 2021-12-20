from uuid import UUID
from datetime import date
from typing import Optional
from dataclasses import dataclass


@dataclass
class ExpenseCategory:
    name: str
    color: str
    id: Optional[UUID] = None
    created_at: Optional[date] = None
    updated_at: Optional[date] = None
