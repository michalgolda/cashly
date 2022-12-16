from typing import List
from uuid import UUID

from fastapi import APIRouter, Depends

from app.dependencies import get_current_user, get_expense_category_repo
from app.entities import User
from app.repositories import ExpenseCategoryRepository
from app.schemas.expense_category import (
    ExpenseCategoryCreate,
    ExpenseCategoryOut,
    ExpenseCategoryUpdate,
)
from app.usecases.expense_category import (
    CreateExpenseCategoryUseCase,
    CreateExpenseCategoryUseCaseInput,
    DeleteExpenseCategoryUseCase,
    DeleteExpenseCategoryUseCaseInput,
    GetAllExpenseCategoriesUseCase,
    GetAllExpenseCategoriesUseCaseInput,
    UpdateExpenseCategoryUseCase,
    UpdateExpenseCategoryUseCaseInput,
)

expense_category_router = APIRouter()


@expense_category_router.get(
    "/expense_categories", response_model=List[ExpenseCategoryOut]
)
def get_all_expense_categories(
    current_user: User = Depends(get_current_user),
    expense_category_repo: ExpenseCategoryRepository = Depends(
        get_expense_category_repo
    ),
):
    usecase_input = GetAllExpenseCategoriesUseCaseInput(current_user.id)
    usecase = GetAllExpenseCategoriesUseCase(expense_category_repo)
    usecase_output = usecase.execute(usecase_input)

    return usecase_output.expense_categories


@expense_category_router.post(
    "/expense_categories", response_model=ExpenseCategoryOut, status_code=201
)
def create_expense_category(
    expense_category: ExpenseCategoryCreate,
    current_user: User = Depends(get_current_user),
    expense_category_repo: ExpenseCategoryRepository = Depends(
        get_expense_category_repo
    ),
):
    usecase_input = CreateExpenseCategoryUseCaseInput(
        name=expense_category.name, color=expense_category.color, user=current_user
    )
    usecase = CreateExpenseCategoryUseCase(expense_category_repo)
    usecase_output = usecase.execute(usecase_input)

    return usecase_output.expense_category


@expense_category_router.put(
    "/expense_categories/{expense_category_id}", response_model=ExpenseCategoryOut
)
def update_expense_category(
    expense_category_id: UUID,
    expense_category: ExpenseCategoryUpdate,
    current_user: User = Depends(get_current_user),
    expense_category_repo: ExpenseCategoryRepository = Depends(
        get_expense_category_repo
    ),
):
    usecase_input = UpdateExpenseCategoryUseCaseInput(
        name=expense_category.name,
        color=expense_category.color,
        expense_category_id=expense_category_id,
        user=current_user,
    )
    usecase = UpdateExpenseCategoryUseCase(expense_category_repo)
    usecase_output = usecase.execute(usecase_input)

    return usecase_output.expense_category


@expense_category_router.delete("/expense_categories/{expense_category_id}")
def delete_expense_category(
    expense_category_id: UUID,
    current_user: User = Depends(get_current_user),
    expense_category_repo: ExpenseCategoryRepository = Depends(
        get_expense_category_repo
    ),
):
    usecase_input = DeleteExpenseCategoryUseCaseInput(
        expense_category_id=expense_category_id, user=current_user
    )
    usecase = DeleteExpenseCategoryUseCase(expense_category_repo)
    usecase.execute(usecase_input)
