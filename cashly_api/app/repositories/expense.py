from uuid import UUID
from datetime import date
from abc import ABC, abstractmethod
from typing import Union, List, NoReturn

from sqlalchemy.orm.session import Session

from app.entities import Expense


class AbstractExpenseRepository(ABC):
    @abstractmethod
    def get_by_id(self, expense_id: UUID) -> Union[Expense, None]:
        pass

    @abstractmethod
    def get_by_date_range(self, start_date: date, end_date: date) -> List[Expense]:
        pass

    @abstractmethod
    def get_all(self) -> List[Expense]:
        pass

    @abstractmethod
    def add(self, expense: Expense) -> Expense:
        pass

    @abstractmethod
    def save(self, expense: Expense) -> Expense:
        pass

    @abstractmethod
    def delete(self, expense: Expense) -> NoReturn:
        pass


class SQLAlchemyExpenseRepository(AbstractExpenseRepository):
    def __init__(self, session: Session):
        self._session = session

    def get_by_id(self, expense_id: UUID) -> Union[Expense, None]:
        expense = self._session.query(Expense) \
            .filter_by(id=expense_id) \
            .first()

        return expense

    def get_by_date_range(self, start_date: date, end_date: date) -> List[Expense]:
        expenses = self._session.query(Expense) \
            .filter(
                (Expense.realised_date >= start_date),
                (Expense.realised_date <= end_date)
            ) \
            .all()

        return expenses

    def get_all(self) -> List[Expense]:
        expenses = self._session.query(Expense).all()

        return expenses

    def add(self, expense: Expense) -> Expense:
        self._session.add(expense)
        self._session.commit()

        return expense

    def save(self, expense: Expense) -> Expense:
        self._session.commit()
        self._session.refresh(expense)

        return expense

    def delete(self, expense: Expense) -> NoReturn:
        self._session.delete(expense)
        self._session.commit()
