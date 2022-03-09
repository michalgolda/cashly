import pytest
from datetime import datetime

from app.usecases import (
    GetAllExpensesUseCase,
    GetExpenseByIdUseCase,
    CreateExpenseUseCase,
    DeleteExpenseUseCase,
    UpdateExpenseUseCase,
    ExportExpensesUseCase,
    ImportExpensesUseCase
)
from app.entities import Expense
from app.usecases.expense import ExpenseNotFoundError
from app.usecases.expense_category import ExpenseCategoryNotFoundError


def test_get_all_expenses(mocker):
    mock_expense = mocker.patch('app.entities.Expense')
    mock_expense_repo = mocker.patch('app.repositories.AbstractExpenseRepository')
    mock_expense_repo.get_all.return_value = [mock_expense]

    usecase = GetAllExpensesUseCase(
        expense_repo=mock_expense_repo
    )
    result = usecase.execute()

    mock_expense_repo.get_all.assert_called_once()

    assert result.expenses == [mock_expense]


def test_get_expense_by_id(mocker):
    mock_expense = mocker.patch('app.entities.Expense')
    mock_expense_repo = mocker.patch('app.repositories.AbstractExpenseRepository')
    mock_expense_repo.get_by_id.return_value = mock_expense

    usecase = GetExpenseByIdUseCase(
        expense_repo=mock_expense_repo
    )
    mock_usecase_request = mocker.patch('app.usecases.expense.GetExpenseByIdRequest')
    result = usecase.execute(mock_usecase_request)

    mock_expense_repo.get_by_id.assert_called_once_with(
        mock_usecase_request.expense_id
    )

    assert result.expense == mock_expense


def test_get_expense_by_id_when_expense_not_found(mocker):
    mock_expense_repo = mocker.patch('app.repositories.AbstractExpenseRepository')
    mock_expense_repo.get_by_id.return_value = None

    usecase = GetExpenseByIdUseCase(
        expense_repo=mock_expense_repo
    )
    mock_usecase_request = mocker.patch('app.usecases.expense.GetExpenseByIdRequest')

    with pytest.raises(ExpenseNotFoundError):
        usecase.execute(mock_usecase_request)

    mock_expense_repo.get_by_id.assert_called_once_with(
        mock_usecase_request.expense_id
    )


def test_create_expense_without_category(mocker):
    mock_expense_repo = mocker.patch('app.repositories.AbstractExpenseRepository')
    mock_expense_category_repo = mocker.patch('app.repositories.AbstractExpenseCategoryRepository')

    usecase = CreateExpenseUseCase(
        expense_repo=mock_expense_repo,
        expense_category_repo=mock_expense_category_repo
    )
    mock_usecase_request = mocker.patch('app.usecases.expense.CreateExpenseRequest')
    mock_usecase_request.expense_category_id = None
    result = usecase.execute(mock_usecase_request)

    assert not mock_expense_category_repo.get_by_id.called

    new_expense = Expense(
        amount=mock_usecase_request.amount,
        realised_date=mock_usecase_request.realised_date
    )

    mock_expense_repo.add.assert_called_once_with(new_expense)

    assert result.expense == new_expense


def test_create_expense_with_category(mocker):
    mock_expense_repo = mocker.patch('app.repositories.AbstractExpenseRepository')

    mock_expense_category = mocker.patch('app.entities.ExpenseCategory')
    mock_expense_category_repo = mocker.patch('app.repositories.AbstractExpenseCategoryRepository')
    mock_expense_category_repo.get_by_id.return_value = mock_expense_category

    usecase = CreateExpenseUseCase(
        expense_repo=mock_expense_repo,
        expense_category_repo=mock_expense_category_repo
    )
    mock_usecase_request = mocker.patch('app.usecases.expense.CreateExpenseRequest')
    mock_usecase_request.expense_category_id = mock_expense_category.id

    result = usecase.execute(mock_usecase_request)

    mock_expense_category_repo.get_by_id.assert_called_once_with(
        mock_usecase_request.expense_category_id
    )

    new_expense = Expense(
        category=mock_expense_category,
        amount=mock_usecase_request.amount,
        realised_date=mock_usecase_request.realised_date
    )

    mock_expense_repo.add.assert_called_once_with(new_expense)

    assert result.expense == new_expense


def test_create_expense_with_category_when_category_not_found(mocker):
    mock_expense_repo = mocker.patch('app.repositories.AbstractExpenseRepository')

    mock_expense_category_repo = mocker.patch('app.repositories.AbstractExpenseCategoryRepository')
    mock_expense_category_repo.get_by_id.return_value = None

    usecase = CreateExpenseUseCase(
        expense_repo=mock_expense_repo,
        expense_category_repo=mock_expense_category_repo
    )
    mock_usecase_request = mocker.patch('app.usecases.expense.CreateExpenseRequest')

    with pytest.raises(ExpenseCategoryNotFoundError):
        usecase.execute(mock_usecase_request)

    mock_expense_category_repo.get_by_id.assert_called_once_with(
        mock_usecase_request.expense_category_id
    )


def test_delete_expense(mocker):
    mock_expense = mocker.patch('app.entities.Expense')
    mock_expense_repo = mocker.patch('app.repositories.AbstractExpenseRepository')
    mock_expense_repo.get_by_id.return_value = mock_expense

    usecase = DeleteExpenseUseCase(expense_repo=mock_expense_repo)
    mock_usecase_request = mocker.patch('app.usecases.expense.DeleteExpenseRequest')
    usecase.execute(mock_usecase_request)

    mock_expense_repo.get_by_id.assert_called_once_with(
        mock_usecase_request.expense_id
    )

    mock_expense_repo.delete.assert_called_once_with(mock_expense)


def test_delete_expense_when_expense_not_found(mocker):
    mock_expense_repo = mocker.patch('app.repositories.AbstractExpenseRepository')
    mock_expense_repo.get_by_id.return_value = None

    usecase = DeleteExpenseUseCase(expense_repo=mock_expense_repo)
    mock_usecase_request = mocker.patch('app.usecases.expense.DeleteExpenseRequest')

    with pytest.raises(ExpenseNotFoundError):
        usecase.execute(mock_usecase_request)

    mock_expense_repo.get_by_id.assert_called_once_with(
        mock_usecase_request.expense_id
    )


def test_update_expense(mocker):
    mock_expense = mocker.patch('app.entities.Expense')
    mock_expense_repo = mocker.patch('app.repositories.AbstractExpenseRepository')
    mock_expense_repo.get_by_id.return_value = mock_expense
    mock_expense_category_repo = mocker.patch('app.repositories.AbstractExpenseCategoryRepository')

    usecase = UpdateExpenseUseCase(
        expense_repo=mock_expense_repo,
        expense_category_repo=mock_expense_category_repo
    )
    mock_usecase_request = mocker.patch('app.usecases.expense.UpdateExpenseRequest')
    mock_usecase_request.expense_category_id = None
    result = usecase.execute(mock_usecase_request)

    mock_expense_repo.get_by_id.assert_called_once_with(
        mock_usecase_request.expense_id
    )

    mock_expense.amount = mock_usecase_request.amount
    mock_expense.realised_date = mock_usecase_request.realised_date

    mock_expense_repo.save.assert_called_once_with(mock_expense)

    assert result.expense == mock_expense


def test_update_expense_when_expense_not_found(mocker):
    mock_expense_repo = mocker.patch('app.repositories.AbstractExpenseRepository')
    mock_expense_repo.get_by_id.return_value = None

    mock_expense_category_repo = mocker.patch('app.repositories.AbstractExpenseCategoryRepository')

    usecase = UpdateExpenseUseCase(
        expense_repo=mock_expense_repo,
        expense_category_repo=mock_expense_category_repo
    )
    mock_usecase_request = mocker.patch('app.usecases.expense.UpdateExpenseRequest')
    mock_usecase_request.expense_category_id = None

    with pytest.raises(ExpenseNotFoundError):
        usecase.execute(mock_usecase_request)

    mock_expense_repo.get_by_id.assert_called_once_with(
        mock_usecase_request.expense_id
    )


def test_update_expense_with_category(mocker):
    mock_expense = mocker.patch('app.entities.Expense')
    mock_expense_repo = mocker.patch('app.repositories.AbstractExpenseRepository')
    mock_expense_repo.get_by_id.return_value = mock_expense

    mock_expense_category = mocker.patch('app.entities.ExpenseCategory')
    mock_expense_category_repo = mocker.patch('app.repositories.AbstractExpenseCategoryRepository')
    mock_expense_category_repo.get_by_id.return_value = mock_expense_category

    usecase = UpdateExpenseUseCase(
        expense_repo=mock_expense_repo,
        expense_category_repo=mock_expense_category_repo
    )
    mock_usecase_request = mocker.patch('app.usecases.expense.UpdateExpenseRequest')
    result = usecase.execute(mock_usecase_request)

    mock_expense_repo.get_by_id.assert_called_once_with(
        mock_usecase_request.expense_id
    )

    mock_expense_category_repo.get_by_id.assert_called_once_with(
        mock_usecase_request.expense_category_id
    )

    mock_expense.category = mock_expense_category
    mock_expense.amount = mock_usecase_request.amount
    mock_expense.realised_date = mock_usecase_request.realised_date

    mock_expense_repo.save.assert_called_once_with(mock_expense)

    assert result.expense == mock_expense


def test_update_expense_with_category_when_category_not_found(mocker):
    mock_expense = mocker.patch('app.entities.Expense')
    mock_expense_repo = mocker.patch('app.repositories.AbstractExpenseRepository')
    mock_expense_repo.get_by_id.return_value = mock_expense

    mock_expense_category_repo = mocker.patch('app.repositories.AbstractExpenseCategoryRepository')
    mock_expense_category_repo.get_by_id.return_value = None

    usecase = UpdateExpenseUseCase(
        expense_repo=mock_expense_repo,
        expense_category_repo=mock_expense_category_repo
    )
    mock_usecase_request = mocker.patch('app.usecases.expense.UpdateExpenseRequest')

    with pytest.raises(ExpenseCategoryNotFoundError):
        usecase.execute(mock_usecase_request)

    mock_expense_repo.get_by_id.assert_called_once_with(
        mock_usecase_request.expense_id
    )

    mock_expense_category_repo.get_by_id.assert_called_once_with(
        mock_usecase_request.expense_category_id
    )


def test_export_expenses(mocker):
    mock_expense_repo = mocker.patch('app.repositories.AbstractExpenseRepository')
    mock_exporter_buffer = mocker.MagicMock()
    mock_expenses_exporter = mocker.patch('app.exporter.ExpensesExporter')
    mock_expenses_exporter.export.return_value = mock_exporter_buffer

    usecase = ExportExpensesUseCase(
        expense_repo=mock_expense_repo,
        expenses_exporter=mock_expenses_exporter
    )
    result = usecase.execute()

    mock_expense_repo.get_all.assert_called_once()

    mock_expenses_exporter.export.assert_called_once()

    assert result.exporter_buffer == mock_exporter_buffer


def test_import_expenses(mocker):
    mock_expense_repo = mocker.patch('app.repositories.AbstractExpenseRepository')
    
    mock_expense_category = mocker.MagicMock()
    mock_expense_category_repo = mocker.patch('app.repositories.AbstractExpenseCategoryRepository')
    mock_expense_category_repo.get_by_name.return_value = mock_expense_category

    mock_expenses_importer = mocker.patch('app.importer.ExpensesImporter')

    mock_parsed_expense = {
        'amount': 102,
        'category_name': 'test',
        'realised_date': datetime.now()
    }

    mock_expenses_importer.make.return_value = [mock_parsed_expense]

    mock_import_expense_request = mocker.patch('app.usecases.expense.ImportExpensesRequest')

    mock_uploaded_file = mocker.patch('tempfile.SpooledTemporaryFile')
    
    mock_import_expense_request.uploaded_file = mock_uploaded_file

    usecase = ImportExpensesUseCase(
        expense_repo=mock_expense_repo,
        expenses_importer=mock_expenses_importer,
        expense_category_repo=mock_expense_category_repo
    )
    usecase.execute(mock_import_expense_request)

    mock_expenses_importer.make.assert_called_once_with(mock_uploaded_file)

    mock_expense_category_repo.get_by_name.assert_called_once_with(mock_parsed_expense.get('category_name'))
    
    mock_expense_repo.add.assert_called_once_with(
        Expense(
            category=mock_expense_category,
            amount=mock_parsed_expense.get('amount'),
            realised_date=mock_parsed_expense.get('realised_date')
        )
    )
