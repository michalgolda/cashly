from uuid import UUID
from typing import List

from fastapi import APIRouter, Depends, Query
from fastapi.responses import StreamingResponse

from app.usecases import (
    GetAllExpensesUseCase,

    GetExpenseByIdUseCase,
    GetExpenseByIdRequest,

    CreateExpenseUseCase,
    CreateExpenseRequest,

    UpdateExpenseUseCase,
    UpdateExpenseRequest,

    DeleteExpenseUseCase,
    DeleteExpenseRequest,

    ExportExpensesUseCase
)
from app.exporter import ExpensesExporter
from app.schemas import ExpenseOut, ExpenseCreate, ExpenseUpdate
from app.dependencies import get_expense_repo, get_expense_category_repo
from app.repositories import AbstractExpenseRepository, AbstractExpenseCategoryRepository


expense_router = APIRouter()


@expense_router.get('/expenses/export/')
def export_expenses(
    expense_repo: AbstractExpenseRepository = Depends(get_expense_repo)
):
    expense_exporter = ExpensesExporter()
    usecase = ExportExpensesUseCase(expense_repo, expense_exporter)
    result = usecase.execute()

    return StreamingResponse(
        result.exporter_buffer,
        headers={
            'Content-Disposition': 'attachment; filename=expenses.csv'
        }
    )


@expense_router.get('/expenses/', response_model=List[ExpenseOut])
def get_all_expenses(
    expense_repo: AbstractExpenseRepository = Depends(get_expense_repo)
):
    usecase = GetAllExpensesUseCase(expense_repo)
    result = usecase.execute()

    return result.expenses


@expense_router.get('/expenses/{expense_id}/', response_model=ExpenseOut)
def get_expense_by_id(
    expense_id: UUID,
    expense_repo: AbstractExpenseRepository = Depends(get_expense_repo)
):
    usecase = GetExpenseByIdUseCase(expense_repo)
    request = GetExpenseByIdRequest(expense_id)
    result = usecase.execute(request)

    return result.expense


@expense_router.post('/expenses/', response_model=ExpenseOut, status_code=201)
def create_expense(
    expense: ExpenseCreate,
    expense_repo: AbstractExpenseRepository = Depends(get_expense_repo),
    expense_category_repo: AbstractExpenseCategoryRepository = Depends(get_expense_category_repo)
):
    usecase = CreateExpenseUseCase(expense_repo, expense_category_repo)
    request = CreateExpenseRequest(
        amount=expense.amount,
        realised_date=expense.realised_date,
        expense_category_id=expense.expense_category_id
    )
    result = usecase.execute(request)

    return result.expense


@expense_router.put('/expenses/{expense_id}/', response_model=ExpenseOut)
def update_expense(
    expense_id: UUID,
    expense: ExpenseUpdate,
    expense_repo: AbstractExpenseRepository = Depends(get_expense_repo),
    expense_category_repo: AbstractExpenseCategoryRepository = Depends(get_expense_category_repo)
):
    usecase = UpdateExpenseUseCase(expense_repo, expense_category_repo)
    request = UpdateExpenseRequest(
        expense_id=expense_id,
        amount=expense.amount,
        realised_date=expense.realised_date,
        expense_category_id=expense.expense_category_id
    )
    result = usecase.execute(request)

    return result.expense


@expense_router.delete('/expenses/{expense_id}/')
def delete_expense(
    expense_id: UUID,
    expense_repo: AbstractExpenseRepository = Depends(get_expense_repo)
):
    usecase = DeleteExpenseUseCase(expense_repo)
    request = DeleteExpenseRequest(expense_id)
    usecase.execute(request)

