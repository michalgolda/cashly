from typing import List
from uuid import UUID

from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from fastapi.responses import StreamingResponse

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
    ImportExpenseCategoriesUseCaseInput,
    ImportExpenseCategoriesUseCase,
    ExportExpenseCategoriesUseCaseInput,
    ExportExpenseCategoriesUseCase,
)
from app.importer import ExpenseCategoryImporter, SUPPORTED_FILE_CONTENT_TYPES
from app.exporter import ExpenseCategoryExporter

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


@expense_category_router.post("/expense_categories/import")
def import_expense_categories(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    expense_category_repo: ExpenseCategoryRepository = Depends(
        get_expense_category_repo
    ),
):
    if file.content_type not in SUPPORTED_FILE_CONTENT_TYPES:
        raise HTTPException(status_code=400, detail="File content type not supported.")

    importer = ExpenseCategoryImporter()

    usecase_input = ImportExpenseCategoriesUseCaseInput(
        user=current_user, uploaded_file=file.file
    )
    usecase = ImportExpenseCategoriesUseCase(expense_category_repo, importer)
    usecase.execute(usecase_input)


@expense_category_router.get("/expense_categories/export")
def export_expense_categories(
    current_user: User = Depends(get_current_user),
    expense_category_repo: ExpenseCategoryRepository = Depends(
        get_expense_category_repo
    ),
):
    exporter = ExpenseCategoryExporter()

    usecase_input = ExportExpenseCategoriesUseCaseInput(current_user)
    usecase = ExportExpenseCategoriesUseCase(
        expense_category_repo=expense_category_repo,
        expense_categories_exporter=exporter,
    )
    usecase_result = usecase.execute(usecase_input)

    return StreamingResponse(
        usecase_result.exported_file,
        headers={"Content-Disposition": "attachment; filename=expense_categories.csv"},
    )
