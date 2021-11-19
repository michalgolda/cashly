from datetime import date

from sqlalchemy import Column, DateTime, Date, ForeignKey, Float, String
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func as sql_func

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
        return f"<{type(self).__name__} id={str(self.id)}>"


class ExpenseCategory(Model):
    __tablename__ = "expense_categories"

    name = Column(String(50))
    color = Column(String(7))

    def __init__(self, name: str, color: str):
        self.name = name
        self.color = color


class Expense(Model):
    __tablename__ = "expenses"

    expense_category_id = Column(
        String,
        ForeignKey("expense_categories.id")
    )
    amount = Column(Float)
    realised_date = Column(Date)

    expense_category = relationship(
        "ExpenseCategory",
        lazy="subquery",
        backref="expenses"
    )

    def __init__(self, expense_category: ExpenseCategory, amount: int, realised_date: date):
        self.amount = amount
        self.realised_date = realised_date
        self.expense_category = expense_category
