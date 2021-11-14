import typing
from abc import ABC, abstractmethod

from app import models, schemas
from app.database import Database


class Repository(ABC):
    def __init__(self, db: Database):
        self._db = db

    @abstractmethod
    def add():
        raise NotImplementedError

    @abstractmethod
    def get():
        raise NotImplementedError

    @abstractmethod
    def get_one_by():
        raise NotImplementedError

    @abstractmethod
    def list():
        raise NotImplementedError

    @abstractmethod
    def delete():
        raise NotImplementedError

    @abstractmethod
    def update():
        raise NotImplementedError


class ExpenseRepository(Repository):
    def add(self, expense: schemas.ExpenseCreate,
            expense_category: models.ExpenseCategory) -> models.Expense:
        with self._db.session_factory() as session:
            new_expense = models.Expense(
                expense_category, amount=expense.amount)

            session.add(new_expense)
            session.commit()
            session.refresh(new_expense)

            return new_expense

    def get(self, expense_id: str) -> typing.Union[models.Expense, None]:
        with self._db.session_factory() as session:
            expense = session.query(models.Expense).get(expense_id)

            return expense

    def get_one_by(self, *args, **kwargs) -> typing.Union[models.Expense, None]:
        with self._db.session_factory() as session:
            expense = session.query(models.Expense) \
                .filter_by(*args, **kwargs).first()

            return expense

    def list(self) -> typing.List[models.Expense]:
        with self._db.session_factory() as session:
            expenses = session.query(models.Expense).all()

            return expenses

    def delete(self, expense: models.Expense) -> models.Expense:
        with self._db.session_factory() as session:
            session.delete(expense)
            session.commit()

            return expense

    def update(self, expense: models.Expense, expense_category: models.ExpenseCategory, expense_update: schemas.ExpenseUpdate) -> models.Expense:
        with self._db.session_factory() as session:
            expense = session.query(models.Expense).get(expense.id)

            expense.amount = expense_update.amount
            expense.expense_category = expense_category

            session.commit()
            session.refresh(expense)

        return expense


class ExpenseCategoryRepository(Repository):
    def add(self, expense_category: schemas.ExpenseCategoryCreate
            ) -> models.ExpenseCategory:
        with self._db.session_factory() as session:
            new_expense_category = models.ExpenseCategory(
                name=expense_category.name, color=expense_category.color)

            session.add(new_expense_category)
            session.commit()
            session.refresh(new_expense_category)

            return new_expense_category

    def get(self, expense_category_id: str
            ) -> typing.Union[models.ExpenseCategory, None]:
        with self._db.session_factory() as session:
            expense_category = session.query(models.ExpenseCategory) \
                .get(expense_category_id)

            return expense_category

    def get_one_by(self, *args,
                   **kwargs) -> typing.Union[models.ExpenseCategory, None]:
        with self._db.session_factory() as session:
            expense_category = session.query(models.ExpenseCategory) \
                .filter_by(*args, **kwargs).first()

            return expense_category

    def list(self) -> typing.List[models.ExpenseCategory]:
        with self._db.session_factory() as session:
            expense_categories = session.query(models.ExpenseCategory).all()

            return expense_categories

    def delete(self,
               expense_category: models.ExpenseCategory) -> models.ExpenseCategory:
        with self._db.session_factory() as session:
            session.delete(expense_category)
            session.commit()

        return expense_category

    def update(self, expense_category: models.ExpenseCategory, expense_category_update: schemas.ExpenseCategoryUpdate) -> models.ExpenseCategory:
        with self._db.session_factory() as session:
            expense_category = session.query(models.ExpenseCategory).get(expense_category.id)

            expense_category.name = expense_category_update.name
            expense_category.color = expense_category_update.color

            session.commit()
            session.refresh(expense_category)

        return expense_category
