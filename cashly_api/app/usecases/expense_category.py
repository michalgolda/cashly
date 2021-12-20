from uuid import UUID
from typing import List, NoReturn
from dataclasses import dataclass
from abc import ABC, abstractmethod

from app.entities import ExpenseCategory
from app.exceptions import DomainException
from app.repositories import AbstractExpenseCategoryRepository


class ExpenseCategoryNotFoundError(DomainException):
    def __init__(self, expense_category_id: UUID):
        self.code = 'ExpenseCategoryNotFound'
        self.message = (
            'Kategoria o podanym id ' 
            f'{str(expense_category_id)} nie istnieje'
        )
        self.status_code = 404

        super().__init__(self.code, self.message, self.status_code)


class ExpenseCategoryNameIsAlreadyUsedError(DomainException):
    def __init__(self, expense_category_name: str):
        self.code = 'ExpenseCategoryNameIsAlreadyUsed'
        self.message = (
            f'Nazwa kategorii {expense_category_name} '
            'jest już w użyciu'
        )
        self.status_code = 419

        super().__init__(self.code, self.message, self.status_code)


@dataclass(frozen=True)
class GetAllExpenseCategoriesResult:
    expense_categories: List[ExpenseCategory]


class AbstractGetAllExpenseCategoriesUseCase(ABC):
    def __init__(
        self,
        expense_category_repo: AbstractExpenseCategoryRepository
    ):
        self._expense_category_repo = expense_category_repo

    @abstractmethod
    def execute(self) -> GetAllExpenseCategoriesResult:
        pass


class GetAllExpenseCategoriesUseCase(AbstractGetAllExpenseCategoriesUseCase):
    def execute(self) -> GetAllExpenseCategoriesResult:
        expense_categories = self._expense_category_repo.get_all()

        response = GetAllExpenseCategoriesResult(expense_categories)

        return response


@dataclass(frozen=True)
class GetExpenseCategoryByIdRequest:
    expense_category_id: UUID


@dataclass(frozen=True)
class GetExpenseCategoryByIdResult:
    expense_category: ExpenseCategory


class AbstractGetExpenseCategoryByIdUseCase(ABC):
    def __init__(
        self,
        expense_category_repo: AbstractExpenseCategoryRepository
    ):
        self._expense_category_repo = expense_category_repo

    @abstractmethod
    def execute(self, request: GetExpenseCategoryByIdRequest) -> GetExpenseCategoryByIdResult:
        pass


class GetExpenseCategoryByIdUseCase(AbstractGetExpenseCategoryByIdUseCase):
    def execute(self, request: GetExpenseCategoryByIdRequest) -> GetExpenseCategoryByIdResult:
        expense_category_id = request.expense_category_id
        expense_category = self._expense_category_repo.get_by_id(expense_category_id)

        if not expense_category:
            raise ExpenseCategoryNotFoundError(expense_category_id)

        result = GetExpenseCategoryByIdResult(expense_category)

        return result


@dataclass(frozen=True)
class CreateExpenseCategoryRequest:
    name: str
    color: str


@dataclass(frozen=True)
class CreateExpenseCategoryResult:
    expense_category: ExpenseCategory


class AbstractCreateExpenseCategoryUseCase(ABC):
    def __init__(
        self,
        expense_category_repo: AbstractExpenseCategoryRepository
    ):
        self._expense_category_repo = expense_category_repo

    @abstractmethod
    def execute(self, request: CreateExpenseCategoryRequest) -> CreateExpenseCategoryResult:
        pass


class CreateExpenseCategoryUseCase(AbstractCreateExpenseCategoryUseCase):
    def execute(self, request: CreateExpenseCategoryRequest) -> CreateExpenseCategoryResult:
        new_expense_category_name = request.name
        new_expense_category_color = request.color

        expense_category_name_is_already_used = bool(
            self._expense_category_repo.get_by_name(new_expense_category_name)
        )

        if expense_category_name_is_already_used:
            raise ExpenseCategoryNameIsAlreadyUsedError(new_expense_category_name)

        new_expense_category = ExpenseCategory(
            name=new_expense_category_name,
            color=new_expense_category_color
        )
        self._expense_category_repo.add(new_expense_category)

        result = CreateExpenseCategoryResult(
            expense_category=new_expense_category
        )

        return result


@dataclass(frozen=True)
class DeleteExpenseCategoryRequest:
    expense_category_id: UUID


class AbstractDeleteExpenseCategoryUseCase(ABC):
    def __init__(
        self,
        expense_category_repo: AbstractExpenseCategoryRepository
    ):
        self._expense_category_repo = expense_category_repo

    @abstractmethod
    def execute(self, request: DeleteExpenseCategoryRequest) -> NoReturn:
        pass


class DeleteExpenseCategoryUseCase(AbstractDeleteExpenseCategoryUseCase):
    def execute(self, request: DeleteExpenseCategoryRequest) -> NoReturn:
        expense_category_id = request.expense_category_id
        expense_category = self._expense_category_repo.get_by_id(expense_category_id)

        if not expense_category:
            raise ExpenseCategoryNotFoundError(expense_category_id)

        self._expense_category_repo.delete(expense_category)


@dataclass(frozen=True)
class UpdateExpenseCategoryRequest:
    name: str
    color: str
    expense_category_id: UUID


@dataclass(frozen=True)
class UpdateExpenseCategoryResult:
    expense_category: ExpenseCategory


class AbstractUpdateExpenseCategoryUseCase(ABC):
    def __init__(
        self,
        expense_category_repo: AbstractExpenseCategoryRepository
    ):
        self._expense_category_repo = expense_category_repo

    @abstractmethod
    def execute(self, request: UpdateExpenseCategoryRequest) -> UpdateExpenseCategoryResult:
        pass


class UpdateExpenseCategoryUseCase(AbstractUpdateExpenseCategoryUseCase):
    def execute(self, request: UpdateExpenseCategoryRequest) -> UpdateExpenseCategoryResult:
        expense_category_id = request.expense_category_id
        expense_category = self._expense_category_repo.get_by_id(expense_category_id)

        if not expense_category:
            raise ExpenseCategoryNotFoundError(expense_category_id)

        new_expense_category_name = request.name
        expense_category_name_is_already_used = bool(
            self._expense_category_repo.get_by_name(new_expense_category_name)
        )
        if expense_category_name_is_already_used:
            raise ExpenseCategoryNameIsAlreadyUsedError(new_expense_category_name)

        new_expense_category_color = request.color
        expense_category.name = new_expense_category_name
        expense_category.color = new_expense_category_color

        self._expense_category_repo.save(expense_category)

        result = UpdateExpenseCategoryResult(expense_category)

        return result
