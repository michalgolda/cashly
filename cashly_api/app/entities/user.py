from uuid import UUID
from typing import Optional
from datetime import datetime
from dataclasses import dataclass


@dataclass
class User:
    first_name: str
    last_name: str
    email: str
    id: Optional[UUID] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
