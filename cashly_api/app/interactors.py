import typing
from abc import ABC, abstractmethod

from app import models, repositories, schemas


class Interactor(ABC):

    @abstractmethod
    def __init__():
        raise NotImplementedError

    @abstractmethod
    def execute():
        raise NotImplementedError


class LogicException(Exception):
    def __init__(self, message: str, status_code=419):
        self.message = message
        self.status_code = status_code


class ExpenseInteractor(Interactor):
    def __init__(self, expense_repo: repositories.ExpenseRepository):
        self._expense_repo = expense_repo


class CreateExpenseInteractor(ExpenseInteractor):
    def __init__(self, expense_category_repo: repositories.ExpenseCategoryRepository, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self._expense_category_repo = expense_category_repo

    def execute(self, expense: schemas.ExpenseCreate) -> models.Expense:
        existing_expense_category = None

        if expense.expense_category_id:
            existing_expense_category = self._expense_category_repo.get(
                expense_category_id=expense.expense_category_id
            )

            if not existing_expense_category:
                raise LogicException(
                    ("You have tried create expense but "
                     "expense category id is not found")
                )

        created_expense = self._expense_repo.add(
            expense,
            expense_category=existing_expense_category
        )

        return created_expense


class DeleteExpenseInteractor(ExpenseInteractor):
    def execute(self, expense_id: str) -> models.Expense:
        existing_expense = self._expense_repo.get(expense_id)

        if not existing_expense:
            raise LogicException(
                "You have tried delete expense but is not found")

        deleted_expense = self._expense_repo.delete(existing_expense)

        return deleted_expense


class GetAllExpensesInteractor(ExpenseInteractor):
    def execute(self) -> typing.List[models.Expense]:
        expenses = self._expense_repo.list()

        return expenses


class GetExpenseByIdInteractor(ExpenseInteractor):
    def execute(self, expense_id: str) -> models.Expense:
        existing_expense = self._expense_repo.get(expense_id)

        if not existing_expense:
            raise LogicException("You have tried get expense but is not found")

        return existing_expense


class UpdateExpenseInteractor(ExpenseInteractor):
    def __init__(self, expense_category_repo: repositories.ExpenseCategoryRepository, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self._expense_category_repo = expense_category_repo

    def execute(self, expense_id: str, expense: schemas.ExpenseUpdate) -> models.Expense:
        existing_expense = self._expense_repo.get(expense_id)

        if not existing_expense:
            raise LogicException("Próbujesz edytować wydatek, który nie istnieje")

        existing_expense_category = None
        expense_category_id = expense.expense_category_id

        if expense_category_id != None:
            existing_expense_category = self._expense_category_repo.get(expense_category_id)

            if not existing_expense_category:
                raise LogicException("Kategoria wydatku nie istnieje")

        updated_expense = self._expense_repo.update(
            existing_expense,
            existing_expense_category, 
            expense
        )

        return updated_expense


class ExpenseCategoryInteractor(Interactor):
    def __init__(self, expense_category_repo: repositories.ExpenseCategoryRepository):
        self._expense_category_repo = expense_category_repo


class CreateExpenseCategoryInteractor(ExpenseCategoryInteractor):
    def execute(self, expense_category: schemas.ExpenseCategoryCreate) -> models.ExpenseCategory:
        expense_category_name_is_already_used = self._expense_category_repo.get_one_by(
            name=expense_category.name)

        if expense_category_name_is_already_used:
            raise LogicException(
                ("You have tried create expense "
                 "category name but name is already used")
            )

        created_expense_category = self._expense_category_repo.add(
            expense_category)

        return created_expense_category


class DeleteExpenseCategoryInteractor(ExpenseCategoryInteractor):
    def execute(self, expense_category_id: str) -> models.ExpenseCategory:
        existing_expense_category = self._expense_category_repo.get(
            expense_category_id)

        if not existing_expense_category:
            raise LogicException(
                ("You have tried delete "
                 "expense category but is not found")
            )

        deleted_expense_category = self._expense_category_repo.delete(
            existing_expense_category)

        return deleted_expense_category


class GetAllExpenseCategoriesInteractor(ExpenseCategoryInteractor):
    def execute(self) -> typing.List[models.ExpenseCategory]:
        exisitng_expense_categories = self._expense_category_repo.list()

        return exisitng_expense_categories


class GetExpenseCategoryByIdInteractor(ExpenseCategoryInteractor):
    def execute(self, expense_category_id: str) -> models.ExpenseCategory:
        existing_expense_category = self._expense_category_repo.get(
            expense_category_id)

        if not existing_expense_category:
            raise LogicException(
                ("You have tried get expense "
                 "category but is not found")
            )

        return existing_expense_category


class UpdateExpenseCategoryInteractor(ExpenseCategoryInteractor):
    def execute(self, expense_category_id: str, expense_category: schemas.ExpenseCategoryUpdate) -> models.ExpenseCategory:
        existing_expense_category = self._expense_category_repo.get(expense_category_id)

        if not existing_expense_category:
            raise LogicException(
                ("Próbujesz edytować kategorię wydatku, " 
                "która nie istnieje")
            )

        updated_expense_category = self._expense_category_repo.update(
            existing_expense_category, 
            expense_category
        )

        return updated_expense_category

        