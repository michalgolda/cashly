from uuid import UUID
from typing import List

from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from fastapi.responses import StreamingResponse

from app.entities import User
from app.exporter import ExpensesExporter
from app.importer import SUPPORTED_FILE_CONTENT_TYPES, ExpensesImporter
from app.schemas.expense import ExpenseOut
from app.repositories import ExpenseRepository, ExpenseCategoryRepository
from app.dependencies import (
    get_current_user, 
    get_expense_repo,
    get_expense_category_repo
)
from app.schemas.expense import ExpenseCreate, ExpenseUpdate
from app.usecases.expense import (
    CreateExpenseUseCase, 
    CreateExpenseUseCaseInput,
    DeleteExpenseUseCase,
    DeleteExpenseUseCaseInput,
    ExportExpensesUseCase,
    ExportExpensesUseCaseInput, 
    GetAllExpensesUseCase, 
    GetAllExpensesUseCaseInput,
    ImportExpensesUseCase,
    ImportExpensesUseCaseInput,
    UpdateExpenseUseCase,
    UpdateExpenseUseCaseInput
)


expense_router = APIRouter()

@expense_router.get('/expenses', response_model=List[ExpenseOut])
def get_all_expenses(
    current_user: User = Depends(get_current_user),
    expense_repo: ExpenseRepository = Depends(get_expense_repo)
):
    usecase_input = GetAllExpensesUseCaseInput(current_user)
    usecase = GetAllExpensesUseCase(expense_repo)
    usecase_output = usecase.execute(usecase_input)
    return usecase_output.expenses

@expense_router.post('/expenses', response_model=ExpenseOut, status_code=201)
def create_expense(
    expense: ExpenseCreate,
    current_user: User = Depends(get_current_user),
    expense_repo:  ExpenseRepository = Depends(get_expense_repo),
    expense_category_repo: ExpenseCategoryRepository = Depends(get_expense_category_repo)
):
    usecase_input = CreateExpenseUseCaseInput(
        user=current_user,
        amount=expense.amount,
        realised_date=expense.realised_date,
        expense_category_id=expense.expense_category_id
    )
    usecase = CreateExpenseUseCase(
        expense_repo,
        expense_category_repo
    )
    usecase_output = usecase.execute(usecase_input)
    return usecase_output.expense

@expense_router.put('/expenses/{expense_id}', response_model=ExpenseOut)
def update_expense(
    expense_id: UUID,
    expense: ExpenseUpdate,
    current_user: User = Depends(get_current_user),
    expense_repo: ExpenseRepository = Depends(get_expense_repo),
    expense_category_repo: ExpenseCategoryRepository = Depends(get_expense_category_repo)
):
    usecase_input = UpdateExpenseUseCaseInput(
        expense_id=expense_id,
        user=current_user,
        amount=expense.amount,
        realised_date=expense.realised_date,
        expense_category_id=expense.expense_category_id
    )
    usecase = UpdateExpenseUseCase(expense_repo, expense_category_repo)
    usecase_output = usecase.execute(usecase_input)
    print(usecase_output)
    return usecase_output.expense

@expense_router.delete('/expenses/{expense_id}')
def delete_expense(
    expense_id: UUID,
    current_user: User = Depends(get_current_user),
    expense_repo: ExpenseRepository = Depends(get_expense_repo)
):
    usecase_input = DeleteExpenseUseCaseInput(expense_id=expense_id, user=current_user)
    usecase = DeleteExpenseUseCase(expense_repo)
    usecase.execute(usecase_input)

@expense_router.get('/expenses/export')
def export_expenses(
    current_user: User = Depends(get_current_user),
    expense_repo: ExpenseRepository = Depends(get_expense_repo)
):
    exporter = ExpensesExporter()
    usecase_input = ExportExpensesUseCaseInput(current_user)
    usecase = ExportExpensesUseCase(expense_repo=expense_repo, expenses_exporter=exporter)
    usecase_result = usecase.execute(usecase_input)

    return StreamingResponse(
        usecase_result.exported_file,
        headers={
            'Content-Disposition': 'attachment; filename=expenses.csv'
        }
    )

@expense_router.post('/expenses/import')
def import_expenses(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    expense_repo: ExpenseRepository = Depends(get_expense_repo),
    expense_category_repo: ExpenseCategoryRepository = Depends(get_expense_category_repo)
):
    if file.content_type not in SUPPORTED_FILE_CONTENT_TYPES:
        raise HTTPException(
            status_code=400,
            detail='File content type not supported.'
        )

    importer = ExpensesImporter()
    usecase_input = ImportExpensesUseCaseInput(
        user=current_user,
        uploaded_file=file.file
    )
    usecase = ImportExpensesUseCase(
        expense_repo=expense_repo,
        expense_category_repo=expense_category_repo,
        expenses_importer=importer,
    )
    usecase.execute(usecase_input)
