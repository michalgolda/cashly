from uuid import UUID
from abc import ABC, abstractmethod
from typing import Union, List, NoReturn

from sqlalchemy.orm.session import Session

from app.entities import ExpenseCategory


class AbstractExpenseCategoryRepository(ABC):
    @abstractmethod
    def get_by_id(self, expense_category_id: UUID) -> Union[ExpenseCategory, None]:
        pass

    @abstractmethod
    def get_by_name(self, expense_category_name: str) -> Union[ExpenseCategory, None]:
        pass

    @abstractmethod
    def get_all(self) -> List[ExpenseCategory]:
        pass

    @abstractmethod
    def add(self, expense_category: ExpenseCategory) -> ExpenseCategory:
        pass

    @abstractmethod
    def delete(self, expense_category: ExpenseCategory) -> NoReturn:
        pass

    @abstractmethod
    def save(self, expense_category: ExpenseCategory) -> ExpenseCategory:
        pass


class SQLAlchemyExpenseCategoryRepository(AbstractExpenseCategoryRepository):
    def __init__(self, session: Session):
        self._session = session

    def get_by_id(self, expense_category_id: UUID) -> Union[ExpenseCategory, None]:
        expense_category = self._session.query(ExpenseCategory) \
                      .filter_by(id=expense_category_id) \
                      .first()

        return expense_category

    def get_by_name(self, expense_category_name: str) -> Union[ExpenseCategory, None]:
        expense_category = self._session.query(ExpenseCategory) \
                      .filter_by(name=expense_category_name) \
                      .first()

        return expense_category

    def get_all(self) -> List[ExpenseCategory]:
        expense_categories = self._session.query(ExpenseCategory).all()

        return expense_categories

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