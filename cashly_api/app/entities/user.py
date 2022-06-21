from uuid import UUID
from typing import Optional
from datetime import datetime
from dataclasses import dataclass


@dataclass
class User:
    email: str
    password: str
    id: Optional[UUID] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None