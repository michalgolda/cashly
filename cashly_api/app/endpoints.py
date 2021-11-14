import typing

from fastapi import APIRouter, Depends

from app import dependencies, interactors, repositories, schemas
from app.database import Database

router = APIRouter()


@router.post(
    "/expense-categories/",
    status_code=201,
    response_model=schemas.ExpenseCategoryOut
)
def create_expense_category(
    expense_category: schemas.ExpenseCategoryCreate,
    db: Database = Depends(dependencies.get_database)
):
    expense_category_repo = repositories.ExpenseCategoryRepository(db)

    interactor = interactors.CreateExpenseCategoryInteractor(
        expense_category_repo
    )

    created_expense_category = interactor.execute(expense_category)

    return created_expense_category


@router.get(
    "/expense-categories/{expense_category_id}/",
    response_model=schemas.ExpenseCategoryOut
)
def get_expense_category(
    expense_category_id: str,
    db: Database = Depends(dependencies.get_database)
):
    expense_category_repo = repositories.ExpenseCategoryRepository(db)

    interactor = interactors.GetExpenseCategoryByIdInteractor(
        expense_category_repo
    )

    exisiting_expense_category = interactor.execute(expense_category_id)

    return exisiting_expense_category


@router.get(
    "/expense-categories/",
    response_model=typing.List[schemas.ExpenseCategoryOut]
)
def get_expense_categories(db: Database = Depends(dependencies.get_database)):
    expense_category_repo = repositories.ExpenseCategoryRepository(db)

    interactor = interactors.GetAllExpenseCategoriesInteractor(
        expense_category_repo
    )

    existing_expense_categories = interactor.execute()

    return existing_expense_categories


@router.delete(
    "/expense-categories/{expense_category_id}/",
    response_model=schemas.ExpenseCategoryOut
)
def delete_expense_category(
    expense_category_id: str,
    db: Database = Depends(dependencies.get_database)
):
    expense_category_repo = repositories.ExpenseCategoryRepository(db)

    interactor = interactors.DeleteExpenseCategoryInteractor(
        expense_category_repo
    )

    deleted_expense_category = interactor.execute(expense_category_id)

    return deleted_expense_category


@router.put(
    "/expense-categories/{expense_category_id}/",
    response_model=schemas.ExpenseCategoryOut
)
def update_expense_category(
    expense_category_id: str,
    expense_category: schemas.ExpenseCategoryUpdate,
    db: Database = Depends(dependencies.get_database)
):
    expense_category_repo = repositories.ExpenseCategoryRepository(db)

    interactor = interactors.UpdateExpenseCategoryInteractor(
        expense_category_repo
    )

    updated_expense_category = interactor.execute(
        expense_category_id, 
        expense_category
    )

    return updated_expense_category


@router.post(
    "/expenses/",
    status_code=201,
    response_model=schemas.ExpenseOut
)
def create_expense(
    expense: schemas.ExpenseCreate,
    db: Database = Depends(dependencies.get_database)
):
    expense_repo = repositories.ExpenseRepository(db)
    expense_category_repo = repositories.ExpenseCategoryRepository(db)

    interactor = interactors.CreateExpenseInteractor(
        expense_repo=expense_repo,
        expense_category_repo=expense_category_repo
    )

    created_expense = interactor.execute(expense)

    return created_expense


@router.get(
    "/expenses/{expense_id}/",
    response_model=schemas.ExpenseOut
)
def get_expense(
    expense_id: str,
    db: Database = Depends(dependencies.get_database)
):
    expense_repo = repositories.ExpenseRepository(db)

    interactor = interactors.GetExpenseByIdInteractor(expense_repo)

    existing_expense = interactor.execute(expense_id)

    return existing_expense


@router.get(
    "/expenses/",
    response_model=typing.List[schemas.ExpenseOut]
)
def get_expenses(db: Database = Depends(dependencies.get_database)):
    expense_repo = repositories.ExpenseRepository(db)

    interactor = interactors.GetAllExpensesInteractor(expense_repo)

    existing_expenses = interactor.execute()

    return existing_expenses


@router.delete(
    "/expenses/{expense_id}/",
    response_model=schemas.ExpenseOut
)
def delete_expense(
    expense_id: str,
    db: Database = Depends(dependencies.get_database)
):
    expense_repo = repositories.ExpenseRepository(db)

    interactor = interactors.DeleteExpenseInteractor(expense_repo)

    deleted_expense = interactor.execute(expense_id)

    return deleted_expense


@router.put(
    "/expenses/{expense_id}/",
    response_model=schemas.ExpenseOut
)
def update_expense_category(
    expense_id: str,
    expense: schemas.ExpenseUpdate,
    db: Database = Depends(dependencies.get_database)
):
    expense_repo = repositories.ExpenseRepository(db)
    expense_category_repo = repositories.ExpenseCategoryRepository(db)

    interactor = interactors.UpdateExpenseInteractor(
        expense_repo=expense_repo,
        expense_category_repo=expense_category_repo
    )

    updated_expense_category = interactor.execute(
        expense_id,
        expense
    )

    return updated_expense_category