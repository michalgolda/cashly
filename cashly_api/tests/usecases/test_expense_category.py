import pytest

from app.entities import ExpenseCategory
from app.usecases import (
    GetAllExpenseCategoriesUseCase,
    GetExpenseCategoryByIdUseCase,
    CreateExpenseCategoryUseCase,
    DeleteExpenseCategoryUseCase,
    UpdateExpenseCategoryUseCase
)
from app.usecases.expense_category import (
    ExpenseCategoryNotFoundError,
    ExpenseCategoryNameIsAlreadyUsedError
)


def test_get_all_expense_categories(mocker):
    mock_expense_category = mocker.patch('app.entities.ExpenseCategory')
    mock_expense_category_repo = mocker.patch(
        'app.repositories.AbstractExpenseCategoryRepository'
    )
    mock_expense_category_repo.get_all.return_value = [mock_expense_category]

    usecase = GetAllExpenseCategoriesUseCase(
        expense_category_repo=mock_expense_category_repo
    )
    result = usecase.execute()

    mock_expense_category_repo.get_all.assert_called_once()

    assert result.expense_categories == [mock_expense_category]


def test_get_expense_category_by_id(mocker):
    mock_expense_category = mocker.patch('app.entities.ExpenseCategory')
    mock_expense_category_repo = mocker.patch(
        'app.repositories.AbstractExpenseCategoryRepository'
    )
    mock_expense_category_repo.get_by_id.return_value = mock_expense_category

    usecase = GetExpenseCategoryByIdUseCase(
        expense_category_repo=mock_expense_category_repo
    )
    mock_usecase_request = mocker.patch(
        'app.usecases.expense_category.GetExpenseCategoryByIdRequest'
    )
    result = usecase.execute(request=mock_usecase_request)

    mock_expense_category_repo.get_by_id.assert_called_once_with(
        mock_usecase_request.expense_category_id
    )

    assert result.expense_category == mock_expense_category


def test_get_expense_category_by_id_when_expense_category_not_found(mocker):
    mock_expense_category_repo = mocker.patch(
        'app.repositories.AbstractExpenseCategoryRepository'
    )
    mock_expense_category_repo.get_by_id.return_value = None

    usecase = GetExpenseCategoryByIdUseCase(
        expense_category_repo=mock_expense_category_repo
    )
    mock_usecase_request = mocker.patch(
        'app.usecases.expense_category.GetExpenseCategoryByIdRequest'
    )

    with pytest.raises(ExpenseCategoryNotFoundError):
        usecase.execute(request=mock_usecase_request)

    mock_expense_category_repo.get_by_id.assert_called_once_with(
        mock_usecase_request.expense_category_id
    )


def test_create_expense_category(mocker):
    mock_expense_category_repo = mocker.patch(
        'app.repositories.AbstractExpenseCategoryRepository'
    )
    mock_expense_category_repo.get_by_name.return_value = None

    usecase = CreateExpenseCategoryUseCase(
        expense_category_repo=mock_expense_category_repo
    )
    mock_usecase_request = mocker.patch(
        'app.usecases.expense_category.CreateExpenseCategoryRequest'
    )
    result = usecase.execute(request=mock_usecase_request)

    mock_expense_category_repo.get_by_name.assert_called_once_with(
        mock_usecase_request.name
    )

    new_expense_category = ExpenseCategory(
        name=mock_usecase_request.name,
        color=mock_usecase_request.color
    )

    mock_expense_category_repo.add.assert_called_once_with(new_expense_category)

    assert result.expense_category == new_expense_category


def test_create_expense_category_when_expense_category_name_is_already_used(mocker):
    mock_expense_category_repo = mocker.patch(
        'app.repositories.AbstractExpenseCategoryRepository'
    )
    mock_expense_category_repo.get_by_name.return_value = True

    usecase = CreateExpenseCategoryUseCase(
        expense_category_repo=mock_expense_category_repo
    )
    mock_usecase_request = mocker.patch(
        'app.usecases.expense_category.CreateExpenseCategoryRequest'
    )

    with pytest.raises(ExpenseCategoryNameIsAlreadyUsedError):
        usecase.execute(request=mock_usecase_request)

    mock_expense_category_repo.get_by_name.assert_called_once_with(
        mock_usecase_request.name
    )


def test_delete_expense_category(mocker):
    mock_expense_category = mocker.patch('app.entities.ExpenseCategory')
    mock_expense_category_repo = mocker.patch(
        'app.repositories.AbstractExpenseCategoryRepository'
    )
    mock_expense_category_repo.get_by_id.return_value = mock_expense_category

    usecase = DeleteExpenseCategoryUseCase(
        expense_category_repo=mock_expense_category_repo
    )
    mock_usecase_request = mocker.patch(
        'app.usecases.expense_category.DeleteExpenseCategoryRequest'
    )
    usecase.execute(mock_usecase_request)

    mock_expense_category_repo.get_by_id.assert_called_once_with(
        mock_usecase_request.expense_category_id
    )

    mock_expense_category_repo.delete.assert_called_once_with(
        mock_expense_category
    )


def test_delete_expense_category_when_expense_category_not_found(mocker):
    mock_expense_category_repo = mocker.patch(
        'app.repositories.AbstractExpenseCategoryRepository'
    )
    mock_expense_category_repo.get_by_id.return_value = None

    usecase = DeleteExpenseCategoryUseCase(
        expense_category_repo=mock_expense_category_repo
    )
    mock_usecase_request = mocker.patch(
        'app.usecases.expense_category.DeleteExpenseCategoryRequest'
    )

    with pytest.raises(ExpenseCategoryNotFoundError):
        usecase.execute(mock_usecase_request)

    mock_expense_category_repo.get_by_id.assert_called_once_with(
        mock_usecase_request.expense_category_id
    )


def test_update_expense_category(mocker):
    mock_expense_category = mocker.patch('app.entities.ExpenseCategory')
    mock_expense_category_repo = mocker.patch(
        'app.repositories.AbstractExpenseCategoryRepository'
    )
    mock_expense_category_repo.get_by_id.return_value = mock_expense_category
    mock_expense_category_repo.get_by_name.return_value = False

    usecase = UpdateExpenseCategoryUseCase(
        expense_category_repo=mock_expense_category_repo
    )

    mock_usecase_request = mocker.patch(
        'app.usecases.expense_category.UpdateExpenseCategoryRequest'
    )

    result = usecase.execute(mock_usecase_request)

    mock_expense_category_repo.get_by_id.assert_called_once_with(
        mock_usecase_request.expense_category_id
    )

    mock_expense_category_repo.get_by_name.assert_called_once_with(
        mock_usecase_request.name
    )

    mock_expense_category.name = mock_usecase_request.name
    mock_expense_category.color = mock_usecase_request.color

    mock_expense_category_repo.save.assert_called_once_with(
        mock_expense_category
    )

    assert result.expense_category == mock_expense_category


def test_update_expense_category_when_expense_category_not_found(mocker):
    mock_expense_category_repo = mocker.patch(
        'app.repositories.AbstractExpenseCategoryRepository'
    )
    mock_expense_category_repo.get_by_id.return_value = None

    usecase = UpdateExpenseCategoryUseCase(
        expense_category_repo=mock_expense_category_repo
    )

    mock_usecase_request = mocker.patch(
        'app.usecases.expense_category.UpdateExpenseCategoryRequest'
    )

    with pytest.raises(ExpenseCategoryNotFoundError):
        usecase.execute(mock_usecase_request)

    mock_expense_category_repo.get_by_id.assert_called_once_with(
        mock_usecase_request.expense_category_id
    )


def test_update_expense_category_when_expense_category_name_is_already_used(mocker):
    mock_expense_category = mocker.patch('app.entities.ExpenseCategory')
    mock_expense_category_repo = mocker.patch(
        'app.repositories.AbstractExpenseCategoryRepository'
    )
    mock_expense_category_repo.get_by_id.return_value = mock_expense_category

    usecase = UpdateExpenseCategoryUseCase(
        expense_category_repo=mock_expense_category_repo
    )

    mock_usecase_request = mocker.patch(
        'app.usecases.expense_category.UpdateExpenseCategoryRequest'
    )

    with pytest.raises(ExpenseCategoryNameIsAlreadyUsedError):
        usecase.execute(mock_usecase_request)

    mock_expense_category_repo.get_by_id.assert_called_once_with(
        mock_usecase_request.expense_category_id
    )

    mock_expense_category_repo.get_by_name.assert_called_once_with(
        mock_usecase_request.name
    )