from dataclasses import dataclass
from typing import List, NoReturn
from uuid import UUID
from io import BytesIO

from app.entities import ExpenseCategory, User
from app.exceptions import (
    ExpenseCategoryNameAlreadyUsedError,
    ExpenseCategoryNotFoundError,
)
from app.repositories import ExpenseCategoryRepository
from app.usecases import UseCase
from app.importer import ExpenseCategoryImporter
from app.exporter import ExpenseCategoryExporter


@dataclass(frozen=True)
class GetAllExpenseCategoriesUseCaseInput:
    user_id: UUID


@dataclass(frozen=True)
class GetAllExpenseCategoriesUseCaseOutput:
    expense_categories: List[ExpenseCategory]


class GetAllExpenseCategoriesUseCase(
    UseCase[GetAllExpenseCategoriesUseCaseInput, GetAllExpenseCategoriesUseCaseOutput]
):
    def __init__(self, expense_category_repo: ExpenseCategoryRepository) -> None:
        self._expense_category_repo = expense_category_repo

    def execute(
        self, input: GetAllExpenseCategoriesUseCaseInput
    ) -> GetAllExpenseCategoriesUseCaseOutput:
        existing_expense_categories = self._expense_category_repo.get_all_by_user_id(
            input.user_id
        )
        return GetAllExpenseCategoriesUseCaseOutput(existing_expense_categories)


@dataclass(frozen=True)
class CreateExpenseCategoryUseCaseInput:
    name: str
    color: str
    user: User


@dataclass(frozen=True)
class CreateExpenseCategoryUseCaseOutput:
    expense_category: ExpenseCategory


class CreateExpenseCategoryUseCase(
    UseCase[CreateExpenseCategoryUseCaseInput, CreateExpenseCategoryUseCaseOutput]
):
    def __init__(self, expense_category_repo: ExpenseCategoryRepository) -> None:
        self._expense_category_repo = expense_category_repo

    def execute(
        self, input: CreateExpenseCategoryUseCaseInput
    ) -> CreateExpenseCategoryUseCaseOutput:
        exisitng_expense_category = self._expense_category_repo.get_by_name_and_user_id(
            input.name, input.user.id
        )
        if exisitng_expense_category:
            raise ExpenseCategoryNameAlreadyUsedError()

        new_expense_category = ExpenseCategory(
            name=input.name, color=input.color, user=input.user
        )
        self._expense_category_repo.add(new_expense_category)

        return CreateExpenseCategoryUseCaseOutput(new_expense_category)


@dataclass(frozen=True)
class UpdateExpenseCategoryUseCaseInput:
    name: str
    color: str
    expense_category_id: UUID
    user: User


@dataclass(frozen=True)
class UpdateExpenseCategoryUseCaseOutput:
    expense_category: ExpenseCategory


class UpdateExpenseCategoryUseCase(
    UseCase[UpdateExpenseCategoryUseCaseInput, UpdateExpenseCategoryUseCaseOutput]
):
    def __init__(self, expense_category_repo: ExpenseCategoryRepository) -> None:
        self._expense_category_repo = expense_category_repo

    def execute(
        self, input: UpdateExpenseCategoryUseCaseInput
    ) -> UpdateExpenseCategoryUseCaseOutput:
        existing_expense_category = self._expense_category_repo.get_by_id_and_user_id(
            input.expense_category_id, input.user.id
        )
        if not existing_expense_category:
            raise ExpenseCategoryNotFoundError()

        if input.name != existing_expense_category.name:
            if self._expense_category_repo.get_by_name_and_user_id(
                input.name, input.user.id
            ):
                raise ExpenseCategoryNameAlreadyUsedError()

        existing_expense_category.name = input.name
        existing_expense_category.color = input.color

        self._expense_category_repo.save(existing_expense_category)

        return UpdateExpenseCategoryUseCaseOutput(existing_expense_category)


@dataclass(frozen=True)
class DeleteExpenseCategoryUseCaseInput:
    expense_category_id: UUID
    user: User


class DeleteExpenseCategoryUseCase(
    UseCase[DeleteExpenseCategoryUseCaseInput, NoReturn]
):
    def __init__(self, expense_category_repo: ExpenseCategoryRepository) -> None:
        self._expense_category_repo = expense_category_repo

    def execute(self, input: DeleteExpenseCategoryUseCaseInput) -> NoReturn:
        existing_expense_category = self._expense_category_repo.get_by_id_and_user_id(
            input.expense_category_id, input.user.id
        )
        if not existing_expense_category:
            raise ExpenseCategoryNotFoundError()

        self._expense_category_repo.delete(existing_expense_category)


@dataclass(frozen=True)
class ImportExpenseCategoriesUseCaseInput:
    user: User
    uploaded_file: BytesIO


class ImportExpenseCategoriesUseCase(
    UseCase[ImportExpenseCategoriesUseCaseInput, NoReturn]
):
    def __init__(
        self,
        expense_category_repo: ExpenseCategoryRepository,
        expense_categories_importer: ExpenseCategoryImporter,
    ) -> None:
        self._expense_category_repo = expense_category_repo
        self._expense_categories_importer = expense_categories_importer

    def execute(self, input: ImportExpenseCategoriesUseCaseInput) -> NoReturn:
        parsed_expense_categories = self._expense_categories_importer.make(
            input.uploaded_file
        )

        for expense_category in parsed_expense_categories:
            self._expense_category_repo.add(
                ExpenseCategory(
                    user=input.user,
                    name=expense_category.get("name"),
                    color=expense_category.get("color"),
                ),
            )


@dataclass(frozen=True)
class ExportExpenseCategoriesUseCaseInput:
    user: User


@dataclass(frozen=True)
class ExportExpenseCategoriesUseCaseOutput:
    exported_file: BytesIO


class ExportExpenseCategoriesUseCase(
    UseCase[ExportExpenseCategoriesUseCaseInput, ExportExpenseCategoriesUseCaseOutput]
):
    def __init__(
        self,
        expense_category_repo: ExpenseCategoryRepository,
        expense_categories_exporter: ExpenseCategoryExporter,
    ) -> None:
        self._expense_category_repo = expense_category_repo
        self._expense_categories_exporter = expense_categories_exporter

    def execute(
        self, input: ExportExpenseCategoriesUseCaseInput
    ) -> ExportExpenseCategoriesUseCaseOutput:
        expenses = self._expense_category_repo.get_all_by_user_id(input.user.id)
        exported_file = self._expense_categories_exporter.export(expenses)
        return ExportExpenseCategoriesUseCaseOutput(exported_file)
