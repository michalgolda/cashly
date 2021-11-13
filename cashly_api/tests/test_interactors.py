import pytest
from app import interactors


def test_create_expense_category_interactor(mocker):
    mock_expense_category = mocker.MagicMock(id="123")

    mock_expense_category_repo = mocker.patch(
        "app.repositories.ExpenseCategoryRepository"
    )

    mock_expense_category_repo.get_one_by.return_value = None
    mock_expense_category_repo.add.return_value = mock_expense_category

    interactor = interactors.CreateExpenseCategoryInteractor(
        expense_category_repo=mock_expense_category_repo
    )

    created_expense_category = interactor.execute(
        expense_category=mock_expense_category
    )

    mock_expense_category_repo.add.assert_called_once_with(
        mock_expense_category)

    assert created_expense_category == mock_expense_category


def test_create_expense_category_interactor_when_expense_category_name_is_already_used(mocker):
    mock_expense_category = mocker.MagicMock(name="Food")

    mock_expense_category_repo = mocker.patch(
        "app.repositories.ExpenseCategoryRepository")

    mock_expense_category_repo.get_one_by.return_value = mock_expense_category

    interactor = interactors.CreateExpenseCategoryInteractor(
        expense_category_repo=mock_expense_category_repo
    )

    with pytest.raises(interactors.LogicException):
        interactor.execute(mock_expense_category)


def test_delete_expense_category_interactor(mocker):
    mock_expense_category = mocker.MagicMock(id="123")

    mock_expense_category_repo = mocker.patch(
        "app.repositories.ExpenseCategoryRepository")

    mock_expense_category_repo.get.return_value = mock_expense_category
    mock_expense_category_repo.delete.return_value = mock_expense_category

    interactor = interactors.DeleteExpenseCategoryInteractor(
        expense_category_repo=mock_expense_category_repo
    )

    deleted_expense_category = interactor.execute(
        expense_category_id=mock_expense_category.id
    )

    mock_expense_category_repo.get.assert_called_once_with(
        mock_expense_category.id
    )

    mock_expense_category_repo.delete.assert_called_once_with(
        mock_expense_category
    )

    assert deleted_expense_category == mock_expense_category


def test_delete_expense_category_interactor_when_expense_category_not_found(mocker):
    mock_expense_category = mocker.MagicMock(id="123")

    mock_expense_category_repo = mocker.patch(
        "app.repositories.ExpenseCategoryRepository")
    mock_expense_category_repo.get.return_value = None

    interactor = interactors.DeleteExpenseCategoryInteractor(
        expense_category_repo=mock_expense_category_repo
    )

    with pytest.raises(interactors.LogicException):
        interactor.execute(expense_category_id=mock_expense_category.id)

    mock_expense_category_repo.get.assert_called_once_with(
        mock_expense_category.id)


def test_get_all_expense_categories_interactor(mocker):
    mock_expense_category = mocker.MagicMock(id="123")

    mock_expense_category_repo = mocker.patch(
        "app.repositories.ExpenseCategoryRepository")
    mock_expense_category_repo.list.return_value = [mock_expense_category]

    interactor = interactors.GetAllExpenseCategoriesInteractor(
        expense_category_repo=mock_expense_category_repo
    )

    existing_expense_categories = interactor.execute()

    mock_expense_category_repo.list.assert_called_once()

    assert existing_expense_categories == [mock_expense_category]


def test_get_expense_category_by_id_interactor(mocker):
    mock_expense_category = mocker.MagicMock(id="123")

    mock_expense_category_repo = mocker.patch(
        "app.repositories.ExpenseCategoryRepository")
    mock_expense_category_repo.get.return_value = mock_expense_category

    interactor = interactors.GetExpenseCategoryByIdInteractor(
        expense_category_repo=mock_expense_category_repo
    )

    existing_expense_category = interactor.execute(
        expense_category_id=mock_expense_category.id
    )

    mock_expense_category_repo.get.assert_called_once_with(
        mock_expense_category.id)

    assert existing_expense_category == mock_expense_category


def test_get_expense_category_by_id_interactor_when_expense_category_not_found(mocker):
    mock_expense_category = mocker.MagicMock(id="123")

    mock_expense_category_repo = mocker.patch(
        "app.repositories.ExpenseCategoryRepository")
    mock_expense_category_repo.get.return_value = None

    interactor = interactors.GetExpenseCategoryByIdInteractor(
        expense_category_repo=mock_expense_category_repo
    )

    with pytest.raises(interactors.LogicException):
        interactor.execute(
            expense_category_id=mock_expense_category.id
        )

    mock_expense_category_repo.get.assert_called_once_with(
        mock_expense_category.id)


def test_create_expense_interactor(mocker):
    mock_expense = mocker.MagicMock(expense_category_id=None)

    mock_expense_repo = mocker.patch("app.repositories.ExpenseRepository")
    mock_expense_category_repo = mocker.patch(
        "app.repositories.ExpenseCategoryRepository")

    mock_expense_repo.add.return_value = mock_expense

    interactor = interactors.CreateExpenseInteractor(
        expense_repo=mock_expense_repo,
        expense_category_repo=mock_expense_category_repo
    )

    created_expense = interactor.execute(mock_expense)

    mock_expense_repo.add.assert_called_once_with(
        mock_expense,
        expense_category=None
    )

    assert created_expense == mock_expense


def test_create_expense_with_expense_category(mocker):
    mock_expense = mocker.MagicMock(expense_category_id="123")
    mock_expense_category = mocker.MagicMock()

    mock_expense_repo = mocker.patch("app.repositories.ExpenseRepository")
    mock_expense_category_repo = mocker.patch(
        "app.repositories.ExpenseCategoryRepository")

    mock_expense_repo.add.return_value = mock_expense
    mock_expense_category_repo.get.return_value = mock_expense_category

    interactor = interactors.CreateExpenseInteractor(
        expense_repo=mock_expense_repo,
        expense_category_repo=mock_expense_category_repo
    )

    created_expense = interactor.execute(mock_expense)

    mock_expense_category_repo.get.assert_called_once_with(
        expense_category_id="123")

    mock_expense_repo.add.assert_called_once_with(
        mock_expense,
        expense_category=mock_expense_category
    )

    assert created_expense == mock_expense


def test_create_expense_with_expense_category_when_category_not_found(mocker):
    mock_expense = mocker.MagicMock(expense_category_id="123")
    mock_expense_category = mocker.MagicMock()

    mock_expense_repo = mocker.patch("app.repositories.ExpenseRepository")
    mock_expense_category_repo = mocker.patch(
        "app.repositories.ExpenseCategoryRepository")

    mock_expense_repo.add.return_value = mock_expense_category
    mock_expense_category_repo.get.return_value = None

    interactor = interactors.CreateExpenseInteractor(
        expense_repo=mock_expense_repo,
        expense_category_repo=mock_expense_category_repo
    )

    with pytest.raises(interactors.LogicException):
        interactor.execute(mock_expense)


def test_delete_expense_interactor(mocker):
    mock_expense = mocker.MagicMock(id="123")

    mock_expense_repo = mocker.patch("app.repositories.ExpenseRepository")
    mock_expense_repo.get.return_value = mock_expense
    mock_expense_repo.delete.return_value = mock_expense

    interactor = interactors.DeleteExpenseInteractor(
        expense_repo=mock_expense_repo,
    )

    deleted_expense = interactor.execute(expense_id=mock_expense.id)

    mock_expense_repo.get.assert_called_once_with(mock_expense.id)

    mock_expense_repo.delete.assert_called_once_with(mock_expense)

    assert deleted_expense == mock_expense


def test_delete_expense_interactor_when_expense_not_found(mocker):
    mock_expense = mocker.MagicMock(id="123")

    mock_expense_repo = mocker.patch("app.repositories.ExpenseRepository")
    mock_expense_repo.get.return_value = None

    interactor = interactors.DeleteExpenseInteractor(
        expense_repo=mock_expense_repo,
    )

    with pytest.raises(interactors.LogicException):
        interactor.execute(expense_id=mock_expense.id)

    mock_expense_repo.get.assert_called_once_with(mock_expense.id)


def test_get_all_expenses_interactor(mocker):
    mock_expense = mocker.MagicMock()

    mock_expense_repo = mocker.patch("app.repositories.ExpenseRepository")
    mock_expense_repo.list.return_value = [mock_expense]

    interactor = interactors.GetAllExpensesInteractor(
        expense_repo=mock_expense_repo
    )

    existing_expenses = interactor.execute()

    mock_expense_repo.list.assert_called_once()

    assert existing_expenses == [mock_expense]


def test_get_expense_by_id_interactor(mocker):
    mock_expense = mocker.MagicMock(id="123")

    mock_expense_repo = mocker.patch("app.repositories.ExpenseRepository")
    mock_expense_repo.get.return_value = mock_expense

    interactor = interactors.GetExpenseByIdInteractor(
        expense_repo=mock_expense_repo
    )

    existing_expense = interactor.execute(expense_id=mock_expense.id)

    mock_expense_repo.get.assert_called_once_with(mock_expense.id)

    assert existing_expense == mock_expense


def test_get_expense_by_id_interactor_when_expense_not_found(mocker):
    mock_expense = mocker.MagicMock(id="123")

    mock_expense_repo = mocker.patch("app.repositories.ExpenseRepository")
    mock_expense_repo.get.return_value = None

    interactor = interactors.GetExpenseByIdInteractor(
        expense_repo=mock_expense_repo
    )

    with pytest.raises(interactors.LogicException):
        interactor.execute(expense_id=mock_expense.id)

    mock_expense_repo.get.assert_called_once_with(mock_expense.id)
