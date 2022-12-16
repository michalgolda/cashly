from abc import abstractmethod
from datetime import date
from typing import List, NoReturn, Optional, Union
from uuid import UUID

from app.entities import Expense, User
from app.repositories import Repository
from sqlalchemy.orm.session import Session


class ExpenseRepository(Repository[Expense]):
    @abstractmethod
    def get_all_by_user_id(self, user_id: UUID) -> List[Expense]:
        ...

    @abstractmethod
    def get_by_id_and_user_id(self, id: UUID, user_id: UUID) -> Union[Expense, None]:
        ...

    @abstractmethod
    def get_by_date_range_and_user_id(
        self, start_date: date, end_date: date, user_id: UUID
    ) -> List[Expense]:
        ...


class MemoryExpenseRepository(ExpenseRepository):
    def __init__(self, expenses: Optional[List[Expense]] = None) -> None:
        self._expenses = expenses or []

    def get_by_id(self, id: UUID) -> Union[Expense, None]:
        for expense in self._expenses:
            if expense.id == id:
                return expense
        return False

    def get_by_id_and_user_id(self, id: UUID, user_id: UUID) -> Union[Expense, None]:
        for expense in self._expenses:
            if expense.id == id and expense.user.id == user_id:
                return expense
        return False

    def get_all_by_user_id(self, user_id: UUID) -> List[Expense]:
        return [expense for expense in self._expenses if expense.user.id == user_id]

    def get_by_date_range_and_user_id(
        self, start_date: date, end_date: date, user_id: UUID
    ) -> List[Expense]:
        return [
            expense
            for expense in self._expenses
            if expense.realised_date >= start_date and expense.realised_date <= end_date
        ]

    def add(self, entity: Expense) -> Expense:
        self._expenses.append(entity)
        return entity

    def save(self, entity: Expense) -> Expense:
        duplicate_of_expenses = self._expenses
        for i, expense in enumerate(duplicate_of_expenses):
            if expense.id == entity.id:
                duplicate_of_expenses[i] = entity
        self._expenses = duplicate_of_expenses
        return entity

    def delete(self, entity: Expense) -> NoReturn:
        self._expenses = [
            expense for expense in self._expenses if expense.id != entity.id
        ]


class SQLAlchemyExpenseRepository(ExpenseRepository):
    def __init__(self, session: Session) -> None:
        self._session = session

    def get_by_id(self, id: UUID) -> Union[Expense, None]:
        return self._session.query(Expense).filter(Expense.id == id).first()

    def get_all_by_user_id(self, user_id: UUID) -> List[Expense]:
        return self._session.query(Expense).join(User).filter(User.id == user_id).all()

    def get_by_id_and_user_id(self, id: UUID, user_id: UUID) -> Union[Expense, None]:
        return (
            self._session.query(Expense)
            .join(User)
            .filter(Expense.id == id, User.id == user_id)
            .first()
        )

    def get_by_date_range_and_user_id(
        self, start_date: date, end_date: date, user_id: UUID
    ) -> List[Expense]:
        return (
            self._session.query(Expense)
            .join(User)
            .filter(
                Expense.realised_date >= start_date,
                Expense.realised_date <= end_date,
                User.id == user_id,
            )
            .all()
        )

    def add(self, entity: Expense) -> Expense:
        self._session.add(entity)
        self._session.commit()

        return entity

    def save(self, entity: Expense) -> Expense:
        self._session.commit()
        self._session.refresh(entity)

        return entity

    def delete(self, entity: Expense) -> NoReturn:
        self._session.delete(entity)
        self._session.commit()
