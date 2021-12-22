from app.database import session
from app.repositories import SQLAlchemyExpenseRepository, SQLAlchemyExpenseCategoryRepository


def get_expense_repo():
    repo = SQLAlchemyExpenseRepository(session)

    return repo


def get_expense_category_repo():
    repo = SQLAlchemyExpenseCategoryRepository(session)

    return repo