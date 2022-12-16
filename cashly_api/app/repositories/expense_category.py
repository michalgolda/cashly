from abc import abstractmethod
from typing import List, NoReturn, Optional, Union
from uuid import UUID

from app.entities import ExpenseCategory, User
from app.repositories import Repository
from sqlalchemy.orm.session import Session


class ExpenseCategoryRepository(Repository[ExpenseCategory]):
    @abstractmethod
    def get_all_by_user_id(self, user_id: UUID) -> List[ExpenseCategory]:
        ...

    @abstractmethod
    def get_by_id_and_user_id(
        self, id: UUID, user_id: UUID
    ) -> Union[ExpenseCategory, None]:
        ...

    @abstractmethod
    def get_by_name_and_user_id(
        self, name: str, user_id: UUID
    ) -> Union[ExpenseCategory, None]:
        ...


class MemoryExpenseCategoryRepository(ExpenseCategoryRepository):
    def __init__(
        self, expense_categories: Optional[List[ExpenseCategory]] = None
    ) -> None:
        self._expense_categories = expense_categories or []

    def get_by_id(self, id: UUID) -> Union[ExpenseCategory, None]:
        for expense_category in self._expense_categories:
            if expense_category.id == id:
                return expense_category
        return None

    def get_all_by_user_id(self, user_id: UUID) -> List[ExpenseCategory]:
        existing_expense_categories = []
        for expense_category in self._expense_categories:
            if expense_category.user.id == user_id:
                existing_expense_categories.append(expense_category)
        return existing_expense_categories

    def get_by_id_and_user_id(
        self, id: UUID, user_id: UUID
    ) -> Union[ExpenseCategory, None]:
        for expense_category in self._expense_categories:
            if expense_category.id == id and expense_category.user.id == user_id:
                return expense_category
        return None

    def get_by_name_and_user_id(
        self, name: str, user_id: UUID
    ) -> Union[ExpenseCategory, None]:
        for expense_category in self._expense_categories:
            if expense_category.name == name and expense_category.user.id == user_id:
                return expense_category
        return None

    def add(self, entity: ExpenseCategory) -> ExpenseCategory:
        self._expense_categories.append(entity)
        return entity

    def save(self, entity: ExpenseCategory) -> ExpenseCategory:
        duplicate_of_expense_categories = self._expense_categories
        for i, expense_category in enumerate(self._expense_categories):
            if expense_category.id == entity.id:
                duplicate_of_expense_categories[i] = entity
        self._expense_categories = duplicate_of_expense_categories
        return entity

    def delete(self, entity: ExpenseCategory) -> NoReturn:
        self._expense_categories = [
            expense_category
            for expense_category in self._expense_categories
            if expense_category.id != entity.id
        ]


class SQLAlchemyExpenseCategoryRepository(ExpenseCategoryRepository):
    def __init__(self, session: Session):
        self._session = session

    def get_by_id(self, id: UUID) -> Union[ExpenseCategory, None]:
        return (
            self._session.query(ExpenseCategory)
            .filter(ExpenseCategory.id == id)
            .first()
        )

    def get_all_by_user_id(self, user_id: UUID) -> List[ExpenseCategory]:
        return (
            self._session.query(ExpenseCategory)
            .join(User)
            .filter(User.id == user_id)
            .all()
        )

    def get_by_id_and_user_id(
        self, id: UUID, user_id: UUID
    ) -> Union[ExpenseCategory, None]:
        return (
            self._session.query(ExpenseCategory)
            .join(User)
            .filter(ExpenseCategory.id == id, User.id == user_id)
            .first()
        )

    def get_by_name_and_user_id(
        self, name: str, user_id: UUID
    ) -> List[ExpenseCategory]:
        return (
            self._session.query(ExpenseCategory)
            .join(User)
            .filter(ExpenseCategory.name == name, User.id == user_id)
            .first()
        )

    def add(self, expense_category: ExpenseCategory) -> ExpenseCategory:
        self._session.add(expense_category)
        self._session.commit()

        return expense_category

    def save(self, expense_category: ExpenseCategory) -> ExpenseCategory:
        self._session.commit()
        self._session.refresh(expense_category)

        return expense_category

    def delete(self, expense_category: ExpenseCategory) -> NoReturn:
        self._session.delete(expense_category)
        self._session.commit()
