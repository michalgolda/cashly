from uuid import UUID
from abc import ABC, abstractmethod
from typing import Union, List, NoReturn

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

