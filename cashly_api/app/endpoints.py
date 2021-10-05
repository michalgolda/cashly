import typing
from fastapi import APIRouter, Depends

from app import (
    schemas,
    interactors, 
    repositories, 
    dependencies
)
from app.database import Database


router = APIRouter()

@router.post(
    "/spend-categories/", 
    status_code=201,
    response_model=schemas.SpendCategoryOut
)
def create_spend_category(
    spend_category: schemas.SpendCategoryCreate,
    db: Database = Depends(dependencies.get_database)
):
    spend_category_repo = repositories.SpendCategoryRepository(db)
    
    interactor = interactors.CreateSpendCategoryInteractor(
        spend_category_repo
    )

    created_spend_category = interactor.execute(spend_category)

    return created_spend_category

@router.get(
    "/spend-categories/{spend_category_id}/",
    response_model=schemas.SpendCategoryOut
)
def get_spend_category(
    spend_category_id: str,
    db: Database = Depends(dependencies.get_database)
):
    spend_category_repo = repositories.SpendCategoryRepository(db)

    interactor = interactors.GetSpendCategoryByIdInteractor(
        spend_category_repo
    )

    existing_spend_category = interactor.execute(spend_category_id)

    return existing_spend_category

@router.get(
    "/spend-categories/",
    response_model=typing.List[schemas.SpendCategoryOut]
)
def get_spend_categories(db: Database = Depends(dependencies.get_database)):
    spend_category_repo = repositories.SpendCategoryRepository(db)

    interactor = interactors.GetAllSpendCategoriesInteractor(
        spend_category_repo
    )

    existing_spend_categories = interactor.execute()

    return existing_spend_categories

@router.delete(
    "/spend-categories/{spend_category_id}/",
    response_model=schemas.SpendCategoryOut
)
def delete_spend_category(
    spend_category_id: str,
    db: Database = Depends(dependencies.get_database)
):
    spend_category_repo = repositories.SpendCategoryRepository(db)

    interactor = interactors.DeleteSpendCategoryInteractor(
        spend_category_repo
    )

    deleted_spend_category = interactor.execute(spend_category_id)

    return deleted_spend_category


@router.post(
    "/spendings/",
    status_code=201,
    response_model=schemas.SpendOut
)
def create_spend(
    spend: schemas.SpendCreate,
    db: Database = Depends(dependencies.get_database)
):
    spend_repo = repositories.SpendRepository(db)
    spend_category_repo = repositories.SpendCategoryRepository(db)

    interactor = interactors.CreateSpendInteractor(
        spend_repo=spend_repo,
        spend_category_repo=spend_category_repo
    )

    created_spend = interactor.execute(spend)

    return created_spend

@router.get(
    "/spendings/{spend_id}/",
    response_model=schemas.SpendOut
)
def get_spend(
    spend_id: str,
    db: Database = Depends(dependencies.get_database)
):
    spend_repo = repositories.SpendRepository(db)

    interactor = interactors.GetSpendByIdInteractor(spend_repo)

    existing_spend = interactor.execute(spend_id)

    return existing_spend

@router.get(
    "/spendings/",
    response_model=typing.List[schemas.SpendOut]
)
def get_spendings(db: Database = Depends(dependencies.get_database)):
    spend_repo = repositories.SpendRepository(db)

    interactor = interactors.GetAllSpendingsInteractor(spend_repo)

    existing_spendings = interactor.execute()

    return existing_spendings

@router.delete(
    "/spendings/{spend_id}/",
    response_model=schemas.SpendOut
)
def delete_spend(
    spend_id: str,
    db: Database = Depends(dependencies.get_database)
):
    spend_repo = repositories.SpendRepository(db)

    interactor = interactors.DeleteSpendInteractor(spend_repo)

    deleted_spend = interactor.execute(spend_id)

    return deleted_spend