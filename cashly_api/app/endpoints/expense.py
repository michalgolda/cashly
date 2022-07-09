from uuid import UUID
from typing import List

from fastapi import APIRouter, Depends

from app.entities import User
from app.schemas import ExpenseOut
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
    GetAllExpensesUseCase, 
    GetAllExpensesUseCaseInput,
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

# from uuid import UUID
# from typing import List

# from fastapi import APIRouter, Depends, Query, File, UploadFile, HTTPException
# from fastapi.responses import StreamingResponse

# from app.usecases import (
#     GetAllExpensesUseCase,
#     GetExpenseByIdUseCase,
#     GetExpenseByIdRequest,
#     CreateExpenseUseCase,
#     CreateExpenseRequest,
#     UpdateExpenseUseCase,
#     UpdateExpenseRequest,
#     DeleteExpenseUseCase,
#     DeleteExpenseRequest,
#     ExportExpensesUseCase,
#     ImportExpensesRequest,
#     ImportExpensesUseCase
# )
# from app.exporter import ExpensesExporter
# from app.importer import ExpensesImporter, SUPPORTED_FILE_CONTENT_TYPES
# from app.schemas import ExpenseOut, ExpenseCreate, ExpenseUpdate
# from app.dependencies import get_expense_repo, get_expense_category_repo
# from app.repositories import AbstractExpenseRepository, AbstractExpenseCategoryRepository


# expense_router = APIRouter()


# @expense_router.get('/expenses/export/')
# def export_expenses(
#     expense_repo: AbstractExpenseRepository = Depends(get_expense_repo)
# ):
#     expense_exporter = ExpensesExporter()
#     usecase = ExportExpensesUseCase(expense_repo, expense_exporter)
#     result = usecase.execute()

#     return StreamingResponse(
#         result.exporter_buffer,
#         headers={
#             'Content-Disposition': 'attachment; filename=expenses.csv'
#         }
#     )


# @expense_router.post('/expenses/import/')
# def import_expenses(
#     uploaded_file: UploadFile = File(...),
#     expense_repo: AbstractExpenseRepository = Depends(get_expense_repo),
#     expense_category_repo: AbstractExpenseCategoryRepository = Depends(get_expense_category_repo)
# ):
#     if uploaded_file.content_type not in SUPPORTED_FILE_CONTENT_TYPES:
#         raise HTTPException(
#             status_code=400,
#             detail='File content type not supported.'
#         )

#     expenses_importer = ExpensesImporter()
#     usecase = ImportExpensesUseCase(
#         expense_repo,
#         expenses_importer,
#         expense_category_repo
#     )
#     request = ImportExpensesRequest(uploaded_file.file)
#     usecase.execute(request)

#     return {'message': 'Successfull imported.'}


# @expense_router.get('/expenses/', response_model=List[ExpenseOut])
# def get_all_expenses(
#     expense_repo: AbstractExpenseRepository = Depends(get_expense_repo)
# ):
#     usecase = GetAllExpensesUseCase(expense_repo)
#     result = usecase.execute()

#     return result.expenses


# @expense_router.get('/expenses/{expense_id}/', response_model=ExpenseOut)
# def get_expense_by_id(
#     expense_id: UUID,
#     expense_repo: AbstractExpenseRepository = Depends(get_expense_repo)
# ):
#     usecase = GetExpenseByIdUseCase(expense_repo)
#     request = GetExpenseByIdRequest(expense_id)
#     result = usecase.execute(request)

#     return result.expense


# @expense_router.post('/expenses/', response_model=ExpenseOut, status_code=201)
# def create_expense(
#     expense: ExpenseCreate,
#     expense_repo: AbstractExpenseRepository = Depends(get_expense_repo),
#     expense_category_repo: AbstractExpenseCategoryRepository = Depends(get_expense_category_repo)
# ):
#     usecase = CreateExpenseUseCase(expense_repo, expense_category_repo)
#     request = CreateExpenseRequest(
#         amount=expense.amount,
#         realised_date=expense.realised_date,
#         expense_category_id=expense.expense_category_id
#     )
#     result = usecase.execute(request)

#     return result.expense


# @expense_router.put('/expenses/{expense_id}/', response_model=ExpenseOut)
# def update_expense(
#     expense_id: UUID,
#     expense: ExpenseUpdate,
#     expense_repo: AbstractExpenseRepository = Depends(get_expense_repo),
#     expense_category_repo: AbstractExpenseCategoryRepository = Depends(get_expense_category_repo)
# ):
#     usecase = UpdateExpenseUseCase(expense_repo, expense_category_repo)
#     request = UpdateExpenseRequest(
#         expense_id=expense_id,
#         amount=expense.amount,
#         realised_date=expense.realised_date,
#         expense_category_id=expense.expense_category_id
#     )
#     result = usecase.execute(request)

#     return result.expense


# @expense_router.delete('/expenses/{expense_id}/')
# def delete_expense(
#     expense_id: UUID,
#     expense_repo: AbstractExpenseRepository = Depends(get_expense_repo)
# ):
#     usecase = DeleteExpenseUseCase(expense_repo)
#     request = DeleteExpenseRequest(expense_id)
#     usecase.execute(request)

