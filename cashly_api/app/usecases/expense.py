from uuid import UUID
from datetime import date
from dataclasses import dataclass
from abc import ABC, abstractmethod
from typing import List, Union, NoReturn

from app.entities import Expense
from app.exceptions import DomainException
from app.repositories import (
    AbstractExpenseRepository,
    AbstractExpenseCategoryRepository
)
from app.usecases.expense_category import ExpenseCategoryNotFoundError


class ExpenseNotFoundError(DomainException):
    def __init__(self, expense_id: UUID):
        self.code = 'ExpenseNotFound'
        self.message = f'Nie znaleziono wydatku o podanym id {str(expense_id)}'
        self.status_code = 404

        super().__init__(self.code, self.message, self.status_code)


@dataclass(frozen=True)
class GetAllExpensesResult:
    expenses: List[Expense]


class AbstractGetAllExpensesUseCase(ABC):
    def __init__(
        self,
        expense_repo: AbstractExpenseRepository
    ):
        self._expense_repo = expense_repo

    @abstractmethod
    def execute(self) -> GetAllExpensesResult:
        pass


class GetAllExpensesUseCase(AbstractGetAllExpensesUseCase):
    def execute(self) -> GetAllExpensesResult:
        expenses = self._expense_repo.get_all()

        result = GetAllExpensesResult(expenses)

        return result


@dataclass(frozen=True)
class GetExpenseByIdRequest:
    expense_id: UUID


@dataclass(frozen=True)
class GetExpenseByIdResult:
    expense: Expense


class AbstractGetExpenseByIdUseCase(ABC):
    def __init__(
        self,
        expense_repo: AbstractExpenseRepository
    ):
        self._expense_repo = expense_repo

    @abstractmethod
    def execute(self, request: GetExpenseByIdRequest) -> GetExpenseByIdResult:
        pass


class GetExpenseByIdUseCase(AbstractGetExpenseByIdUseCase):
    def execute(self, request: GetExpenseByIdRequest) -> GetExpenseByIdResult:
        expense_id = request.expense_id
        expense = self._expense_repo.get_by_id(expense_id)

        if not expense:
            raise ExpenseNotFoundError(expense_id)

        result = GetExpenseByIdResult(expense)

        return result


@dataclass(frozen=True)
class CreateExpenseRequest:
    amount: float
    realised_date: date
    expense_category_id: Union[UUID, None]


@dataclass(frozen=True)
class CreateExpenseResult:
    expense: Expense


class AbstractCreateExpenseUseCase(ABC):
    def __init__(
        self,
        expense_repo: AbstractExpenseRepository,
        expense_category_repo: AbstractExpenseCategoryRepository
    ):
        self._expense_repo = expense_repo
        self._expense_category_repo = expense_category_repo

    @abstractmethod
    def execute(self, request: CreateExpenseRequest) -> CreateExpenseResult:
        pass


class CreateExpenseUseCase(AbstractCreateExpenseUseCase):
    def execute(self, request: CreateExpenseRequest) -> CreateExpenseResult:
        expense_category_id = request.expense_category_id
        expense_category = None

        if expense_category_id:
            expense_category = self._expense_category_repo.get_by_id(expense_category_id)

            if not expense_category:
                raise ExpenseCategoryNotFoundError(expense_category_id)

        new_expense_amount = request.amount
        new_expense_realised_date = request.realised_date
        new_expense = Expense(
            amount=new_expense_amount,
            category=expense_category,
            realised_date=new_expense_realised_date
        )
        self._expense_repo.add(new_expense)

        result = CreateExpenseResult(expense=new_expense)

        return result


@dataclass(frozen=True)
class DeleteExpenseRequest:
    expense_id: UUID


class AbstractDeleteExpenseUseCase(ABC):
    def __init__(
        self,
        expense_repo: AbstractExpenseRepository
    ):
        self._expense_repo = expense_repo

    @abstractmethod
    def execute(self, request: DeleteExpenseRequest) -> NoReturn:
        pass


class DeleteExpenseUseCase(AbstractDeleteExpenseUseCase):
    def execute(self, request: DeleteExpenseRequest) -> NoReturn:
        expense_id = request.expense_id
        expense = self._expense_repo.get_by_id(expense_id)

        if not expense:
            raise ExpenseNotFoundError(expense_id)

        self._expense_repo.delete(expense)


@dataclass(frozen=True)
class UpdateExpenseRequest:
    amount: float
    expense_id: UUID
    realised_date: date
    expense_category_id: Union[UUID, None]


@dataclass(frozen=True)
class UpdateExpenseResult:
    expense: Expense


class AbstractUpdateExpenseUseCase(ABC):
    def __init__(
        self,
        expense_repo: AbstractExpenseRepository,
        expense_category_repo: AbstractExpenseCategoryRepository
    ):
        self._expense_repo = expense_repo
        self._expense_category_repo = expense_category_repo

    @abstractmethod
    def execute(self, request: UpdateExpenseRequest) -> UpdateExpenseResult:
        pass


class UpdateExpenseUseCase(AbstractUpdateExpenseUseCase):
    def execute(self, request: UpdateExpenseRequest) -> UpdateExpenseResult:
        expense_id = request.expense_id
        expense = self._expense_repo.get_by_id(expense_id)

        if not expense:
            raise ExpenseNotFoundError(expense_id)

        expense_category = None
        expense_category_id = request.expense_category_id
        if expense_category_id:
            expense_category = self._expense_category_repo.get_by_id(
                expense_category_id
            )

            if not expense_category:
                raise ExpenseCategoryNotFoundError(expense_category_id)

        new_expense_amount = request.amount
        new_expense_realised_date = request.realised_date
        expense.amount = new_expense_amount
        expense.category = expense_category
        expense.realised_date = new_expense_realised_date
        self._expense_repo.save(expense)

        result = UpdateExpenseResult(expense)

        return result
