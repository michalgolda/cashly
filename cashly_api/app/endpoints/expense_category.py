from uuid import UUID
from typing import List

from fastapi import APIRouter, Depends

from app.schemas import (
    ExpenseCategoryOut,
    ExpenseCategoryCreate,
    ExpenseCategoryUpdate
)
from app.dependencies import get_expense_category_repo
from app.usecases import (
    GetExpenseCategoryByIdUseCase,
    GetExpenseCategoryByIdRequest,

    GetAllExpenseCategoriesUseCase,

    CreateExpenseCategoryUseCase,
    CreateExpenseCategoryRequest,

    UpdateExpenseCategoryUseCase,
    UpdateExpenseCategoryRequest,

    DeleteExpenseCategoryUseCase,
    DeleteExpenseCategoryRequest
)
from app.repositories import AbstractExpenseCategoryRepository


expense_category_router = APIRouter()


@expense_category_router.get('/expense_categories/', response_model=List[ExpenseCategoryOut])
def get_all_expense_categories(
        expense_category_repo: AbstractExpenseCategoryRepository = Depends(get_expense_category_repo)
):
    usecase = GetAllExpenseCategoriesUseCase(expense_category_repo)
    result = usecase.execute()

    return result.expense_categories


@expense_category_router.get('/expense_categories/{expense_category_id}', response_model=ExpenseCategoryOut)
def get_expense_category_by_id(
        expense_category_id: UUID,
        expense_category_repo: AbstractExpenseCategoryRepository = Depends(get_expense_category_repo)
):
    usecase = GetExpenseCategoryByIdUseCase(expense_category_repo)
    request = GetExpenseCategoryByIdRequest(expense_category_id)
    result = usecase.execute(request)

    return result.expense_category


@expense_category_router.post('/expense_categories/', response_model=ExpenseCategoryOut, status_code=201)
def create_expense_category(
        expense_category: ExpenseCategoryCreate,
        expense_category_repo: AbstractExpenseCategoryRepository = Depends(get_expense_category_repo)
):
    usecase = CreateExpenseCategoryUseCase(expense_category_repo)
    request = CreateExpenseCategoryRequest(
        name=expense_category.name,
        color=expense_category.color
    )
    result = usecase.execute(request)

    return result.expense_category


@expense_category_router.put('/expense_categories/{expense_category_id}/', response_model=ExpenseCategoryOut)
def update_expense_category(
        expense_category_id: UUID,
        expense_category: ExpenseCategoryUpdate,
        expense_category_repo: AbstractExpenseCategoryRepository = Depends(get_expense_category_repo)
):
    usecase = UpdateExpenseCategoryUseCase(expense_category_repo)
    request = UpdateExpenseCategoryRequest(
        name=expense_category.name,
        color=expense_category.color,
        expense_category_id=expense_category_id
    )
    result = usecase.execute(request)

    return result.expense_category


@expense_category_router.delete('/expense_categories/{expense_category_id}/')
def delete_expense_category(
        expense_category_id: UUID,
        expense_category_repo: AbstractExpenseCategoryRepository = Depends(get_expense_category_repo)
):
    usecase = DeleteExpenseCategoryUseCase(expense_category_repo)
    request = DeleteExpenseCategoryRequest(expense_category_id)
    usecase.execute(request)
