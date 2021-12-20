from uuid import UUID
from abc import ABC, abstractmethod
from typing import Union, List, NoReturn

from app.entities import Expense


class AbstractExpenseRepository(ABC):
    @abstractmethod
    def get_by_id(self, expense_id: UUID) -> Union[Expense, None]:
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
