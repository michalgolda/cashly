import decimal
from enum import Enum

from sqlalchemy import (
    Column, 
    String,
    Integer,
    DateTime,
    ForeignKey
)
from sqlalchemy.sql import func as sql_func 
from sqlalchemy.orm import relationship

from app.database import Base
from app.utils import uuid4_as_string


class Model(Base):
    __abstract__ = True

    id = Column(
        String, 
        index=True,
        primary_key=True,
        default=uuid4_as_string
    )
    created_at = Column(
        DateTime(timezone=True),
        server_default=sql_func.now()
    )
    updated_at = Column(
        DateTime(timezone=True),
        onupdate=sql_func.now()
    )

    def __repr__(self):
        return f'<{type(self).__name__} id={str(self.id)}>'

class SpendCategory(Model):
    __tablename__ = "spend_categories"

    name = Column(String(50))
    color = Column(String(7))
    
    def __init__(self, name: str, color: str):
        self.name = name
        self.color = color

class Spend(Model):
    __tablename__ = "spendings"

    spend_category_id = Column(
        String,
        ForeignKey("spend_categories.id")
    )
    amount = Column(Integer)
    
    spend_category = relationship(
        "SpendCategory",
        lazy="subquery",
        backref="spendings"
    )

    def __init__(self, spend_category: SpendCategory, amount: int):
        self.amount = amount
        self.spend_category = spend_category