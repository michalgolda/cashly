import pytest

from app.entities.expense_category import ExpenseCategory
from app.exceptions import ExpenseCategoryNameAlreadyUsedError, ExpenseCategoryNotFoundError
from app.usecases.expense_category import (
    CreateExpenseCategoryUseCase,
    GetAllExpenseCategoriesUseCase, 
    UpdateExpenseCategoryUseCase
)


def test_get_all_expense_categories(mocker):
    mock_expense_category_entity = mocker.patch('app.entities.ExpenseCategory')
    mock_expense_category_repo = mocker.patch('app.repositories.ExpenseCategoryRepository')
    mock_expense_category_repo.get_all_by_user_id.return_value = [mock_expense_category_entity]

    mock_usecase_input = mocker.patch('app.usecases.expense_category.GetAllExpenseCategoriesUseCaseInput')
    usecase = GetAllExpenseCategoriesUseCase(expense_category_repo=mock_expense_category_repo)
    usecase_output = usecase.execute(mock_usecase_input)

    assert usecase_output.expense_categories == [mock_expense_category_entity]

    mock_expense_category_repo.get_all_by_user_id.assert_called_once_with(mock_usecase_input.user_id)


def test_create_expense_category(mocker):
    mock_expense_category_repo = mocker.patch('app.repositories.ExpenseCategoryRepository')
    mock_expense_category_repo.get_by_name_and_user_id.return_value = None

    mock_usecase_input = mocker.patch('app.usecases.expense_category.CreateExpenseCategoryUseCaseInput')
    usecase = CreateExpenseCategoryUseCase(mock_expense_category_repo)
    usecase_output = usecase.execute(mock_usecase_input)

    new_expense_category = ExpenseCategory(
        name=mock_usecase_input.name, 
        color=mock_usecase_input.color,
        user=mock_usecase_input.user
    )

    assert usecase_output.expense_category == new_expense_category

    mock_expense_category_repo.get_by_name_and_user_id.assert_called_once_with(mock_usecase_input.name, mock_usecase_input.user.id)
    mock_expense_category_repo.add.assert_called_once_with(new_expense_category)

def test_create_expense_category_when_name_already_used(mocker):
    mock_expense_category_repo = mocker.patch('app.repositories.ExpenseCategoryRepository')
    mock_usecase_input = mocker.patch('app.usecases.expense_category.CreateExpenseCategoryUseCaseInput')
    usecase = CreateExpenseCategoryUseCase(mock_expense_category_repo)

    with pytest.raises(ExpenseCategoryNameAlreadyUsedError):
        usecase.execute(mock_usecase_input)

    mock_expense_category_repo.get_by_name_and_user_id.assert_called_once_with(mock_usecase_input.name, mock_usecase_input.user.id)

def test_update_expense_category(mocker):
    mock_expense_category_entity = mocker.patch('app.entities.ExpenseCategory')
    mock_expense_category_repo = mocker.patch('app.repositories.ExpenseCategoryRepository')
    mock_expense_category_repo.get_by_id_and_user_id.return_value = mock_expense_category_entity
    mock_expense_category_repo.get_by_name_and_user_id.return_value = None

    mock_usecase_input = mocker.patch('app.usecases.expense_category.UpdateExpenseCategoryUseCaseInput')
    usecase = UpdateExpenseCategoryUseCase(mock_expense_category_repo)
    usecase_output = usecase.execute(mock_usecase_input)

    mock_expense_category_entity.name = mock_usecase_input.name
    mock_expense_category_entity.color = mock_usecase_input.color

    assert usecase_output.expense_category == mock_expense_category_entity

    mock_expense_category_repo.get_by_id_and_user_id.assert_called_once_with(
        mock_usecase_input.expense_category_id, 
        mock_usecase_input.user.id
    )
    mock_expense_category_repo.save.assert_called_once_with(mock_expense_category_entity)

def test_update_expense_category_when_expense_category_not_found(mocker):
    mock_expense_category_repo = mocker.patch('app.repositories.ExpenseCategoryRepository')
    mock_expense_category_repo.get_by_id_and_user_id.return_value = None

    mock_usecase_input = mocker.patch('app.usecases.expense_category.UpdateExpenseCategoryUseCaseInput')
    usecase = UpdateExpenseCategoryUseCase(mock_expense_category_repo)
    
    with pytest.raises(ExpenseCategoryNotFoundError):
        usecase.execute(mock_usecase_input)

    mock_expense_category_repo.get_by_id_and_user_id.assert_called_once_with(
        mock_usecase_input.expense_category_id, 
        mock_usecase_input.user.id
    )
