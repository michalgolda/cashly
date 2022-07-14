import pytest
from datetime import datetime

from app.entities import Expense
from app.exceptions import ExpenseCategoryNotFoundError, ExpenseNotFoundError
from app.usecases.expense import (
    GetAllExpensesUseCase, 
    CreateExpenseUseCase,
    UpdateExpenseUseCase,
    DeleteExpenseUseCase,
    ExportExpensesUseCase,
    ImportExpensesUseCase
)


def test_get_all_expenses(mocker):
    mock_expense_entity = mocker.patch('app.entities.Expense')
    mock_expense_repo = mocker.patch('app.repositories.ExpenseRepository')
    mock_expense_repo.get_all_by_user_id.return_value = [mock_expense_entity]

    mock_usecase_input = mocker.patch('app.usecases.expense.GetAllExpensesUseCaseInput')
    usecase = GetAllExpensesUseCase(mock_expense_repo)
    usecase_output = usecase.execute(mock_usecase_input)

    assert usecase_output.expenses == [mock_expense_entity]

    mock_expense_repo.get_all_by_user_id.assert_called_once_with(mock_usecase_input.user.id)

def test_create_expense(mocker):
    mock_expense_repo = mocker.patch('app.repositories.ExpenseRepository')
    mock_expense_category_repo = mocker.patch('app.repositories.ExpenseCategoryRepository')

    mock_usecase_input = mocker.patch('app.usecases.expense.CreateExpenseUseCaseInput')
    mock_usecase_input.expense_category_id = None

    usecase = CreateExpenseUseCase(
        expense_repo=mock_expense_repo, 
        expense_category_repo=mock_expense_category_repo
    )
    usecase_output = usecase.execute(mock_usecase_input)

    new_expense = Expense(
        user=mock_usecase_input.user,
        amount=mock_usecase_input.amount,
        realised_date=mock_usecase_input.realised_date,
    )

    assert usecase_output.expense == new_expense

    assert not mock_expense_category_repo.get_by_id_and_user_id.called
    mock_expense_repo.add.assert_called_once_with(new_expense)
     
def test_create_expense_with_category(mocker):
    mock_expense_category_entity = mocker.patch('app.entities.ExpenseCategory')
    mock_expense_repo = mocker.patch('app.repositories.ExpenseRepository')
    mock_expense_category_repo = mocker.patch('app.repositories.ExpenseCategoryRepository')
    mock_expense_category_repo.get_by_id_and_user_id.return_value = mock_expense_category_entity

    mock_usecase_input = mocker.patch('app.usecases.expense.CreateExpenseUseCaseInput')

    usecase = CreateExpenseUseCase(
        expense_repo=mock_expense_repo, 
        expense_category_repo=mock_expense_category_repo
    )
    usecase_output = usecase.execute(mock_usecase_input)

    new_expense = Expense(
        user=mock_usecase_input.user,
        amount=mock_usecase_input.amount,
        category=mock_expense_category_entity,
        realised_date=mock_usecase_input.realised_date
    )

    assert usecase_output.expense == new_expense

    mock_expense_category_repo.get_by_id_and_user_id.assert_called_once_with(
        mock_usecase_input.expense_category_id, 
        mock_usecase_input.user.id
    )
    mock_expense_repo.add.assert_called_once_with(new_expense)

def test_create_expense_with_category_when_category_not_found(mocker):
    mock_expense_repo = mocker.patch('app.repositories.ExpenseRepository')
    mock_expense_category_repo = mocker.patch('app.repositories.ExpenseCategoryRepository')
    mock_expense_category_repo.get_by_id_and_user_id.return_value = None

    mock_usecase_input = mocker.patch('app.usecases.expense.CreateExpenseUseCaseInput')

    usecase = CreateExpenseUseCase(
        expense_repo=mock_expense_repo, 
        expense_category_repo=mock_expense_category_repo
    )
    
    with pytest.raises(ExpenseCategoryNotFoundError):
        usecase.execute(mock_usecase_input)

    mock_expense_category_repo.get_by_id_and_user_id.assert_called_once_with(
        mock_usecase_input.expense_category_id, 
        mock_usecase_input.user.id
    )

def test_delete_expense(mocker):
    mock_expense_entity = mocker.patch('app.entities.Expense')
    mock_expense_repo = mocker.patch('app.repositories.ExpenseRepository')
    mock_expense_repo.get_by_id_and_user_id.return_value = mock_expense_entity

    mock_usecase_input = mocker.patch('app.usecases.expense.DeleteExpenseUseCaseInput')
    usecase = DeleteExpenseUseCase(mock_expense_repo)
    usecase.execute(mock_usecase_input)

    mock_expense_repo.get_by_id_and_user_id.assert_called_once_with(mock_usecase_input.expense_id, mock_usecase_input.user.id)
    mock_expense_repo.delete.assert_called_once_with(mock_expense_entity)

def test_delete_expense_when_expense_not_found(mocker):
    mock_expense_repo = mocker.patch('app.repositories.ExpenseRepository')
    mock_expense_repo.get_by_id_and_user_id.return_value = None

    mock_usecase_input = mocker.patch('app.usecases.expense.DeleteExpenseUseCaseInput')
    usecase = DeleteExpenseUseCase(mock_expense_repo)
    
    with pytest.raises(ExpenseNotFoundError):
        usecase.execute(mock_usecase_input)

    mock_expense_repo.get_by_id_and_user_id.assert_called_once_with(mock_usecase_input.expense_id, mock_usecase_input.user.id)
    
def test_update_expense(mocker):
    mock_expense_entity = mocker.patch('app.entities.Expense')
    mock_expense_repo = mocker.patch('app.repositories.ExpenseRepository')
    mock_expense_repo.get_by_id_and_user_id.return_value = mock_expense_entity

    mock_expense_category_entity = mocker.patch('app.entities.ExpenseCategory')
    mock_expense_category_repo = mocker.patch('app.repositories.ExpenseCategoryRepository')
    mock_expense_category_repo.get_by_id_and_user_id.return_value = mock_expense_category_entity

    mock_usecase_input = mocker.patch('app.usecases.expense.UpdateExpenseUseCaseInput')
    usecase = UpdateExpenseUseCase(
        expense_repo=mock_expense_repo, 
        expense_category_repo=mock_expense_category_repo
    )
    usecase_output = usecase.execute(mock_usecase_input)

    mock_expense_entity.amount = mock_usecase_input.amount
    mock_expense_entity.category = mock_expense_category_entity
    mock_expense_entity.realised_date = mock_usecase_input.realised_date

    assert usecase_output.expense == mock_expense_entity

    mock_expense_repo.save.assert_called_once_with(mock_expense_entity)
    mock_expense_repo.get_by_id_and_user_id.assert_called_once_with(mock_usecase_input.expense_id, mock_usecase_input.user.id)
    mock_expense_category_repo.get_by_id_and_user_id.assert_called_once_with(
        mock_usecase_input.expense_category_id, 
        mock_usecase_input.user.id
    )

def test_update_expense_when_expense_category_not_found(mocker):
    mock_expense_entity = mocker.patch('app.entities.Expense')
    mock_expense_repo = mocker.patch('app.repositories.ExpenseRepository')
    mock_expense_repo.get_by_id_and_user_id.return_value = mock_expense_entity

    mock_expense_category_repo = mocker.patch('app.repositories.ExpenseCategoryRepository')
    mock_expense_category_repo.get_by_id_and_user_id.return_value = None

    mock_usecase_input = mocker.patch('app.usecases.expense.UpdateExpenseUseCaseInput')
    usecase = UpdateExpenseUseCase(
        expense_repo=mock_expense_repo, 
        expense_category_repo=mock_expense_category_repo
    )
    with pytest.raises(ExpenseCategoryNotFoundError):
        usecase.execute(mock_usecase_input)

    mock_expense_repo.get_by_id_and_user_id.assert_called_once_with(mock_usecase_input.expense_id, mock_usecase_input.user.id)
    mock_expense_category_repo.get_by_id_and_user_id.assert_called_once_with(
        mock_usecase_input.expense_category_id, 
        mock_usecase_input.user.id
    )

def test_export_expenses(mocker):
    mock_exported_file_buffer = mocker.MagicMock()
    mock_expenses_exporter = mocker.patch('app.exporter.ExpensesExporter')
    mock_expenses_exporter.export.return_value = mock_exported_file_buffer

    mock_expense_entity = mocker.patch('app.entities.Expense')
    mock_expense_repo = mocker.patch('app.repositories.ExpenseRepository')
    mock_expense_repo.get_all_by_user_id.return_value = [mock_expense_entity]

    mock_usecase_input = mocker.patch('app.usecases.expense.ExportExpensesUseCaseInput')
    usecase = ExportExpensesUseCase(
        expense_repo=mock_expense_repo,
        expenses_exporter=mock_expenses_exporter
    )
    usecase_result = usecase.execute(mock_usecase_input)

    mock_expense_repo.get_all_by_user_id.assert_called_once_with(mock_usecase_input.user.id)
    mock_expenses_exporter.export.assert_called_once_with([mock_expense_entity])
    assert usecase_result.exported_file == mock_exported_file_buffer

def test_import_expenses(mocker):
    mock_expense_repo = mocker.patch('app.repositories.ExpenseRepository')

    mock_expense_category_entity = mocker.patch('app.entities.ExpenseCategory')
    mock_expense_category_repo = mocker.patch('app.repositories.ExpenseCategoryRepository')
    mock_expense_category_repo.get_by_name_and_user_id.return_value = mock_expense_category_entity

    mock_parsed_expense = {
        'amount': 102,
        'category_name': 'test',
        'realised_date': datetime.now()
    }
    mock_expenses_importer = mocker.patch('app.importer.ExpensesImporter')
    mock_expenses_importer.make.return_value = [mock_parsed_expense]

    mock_usecase_input = mocker.patch('app.usecases.expense.ExportExpensesUseCaseInput')
    usecase = ImportExpensesUseCase(
        expense_repo=mock_expense_repo,
        expense_category_repo=mock_expense_category_repo,
        expenses_importer=mock_expenses_importer
    )
    usecase.execute(mock_usecase_input)

    mock_expenses_importer.make.assert_called_once_with(mock_usecase_input.uploaded_file)
    mock_expense_category_repo.get_by_name_and_user_id.assert_called_once_with(
        mock_parsed_expense.get('category_name'), 
        mock_usecase_input.user.id
    )
    mock_expense_repo.add.assert_called_once_with(Expense(
        user=mock_usecase_input.user,
        amount=mock_parsed_expense.get('amount'),
        realised_date=mock_parsed_expense.get('realised_date'),
        category=mock_expense_category_entity
    ))

# def test_import_expenses(mocker):
#     mock_expense_repo = mocker.patch('app.repositories.AbstractExpenseRepository')
    
#     mock_expense_category = mocker.MagicMock()
#     mock_expense_category_repo = mocker.patch('app.repositories.AbstractExpenseCategoryRepository')
#     mock_expense_category_repo.get_by_name.return_value = mock_expense_category

#     mock_expenses_importer = mocker.patch('app.importer.ExpensesImporter')

#     mock_parsed_expense = {
        # 'amount': 102,
        # 'category_name': 'test',
        # 'realised_date': datetime.now()
#     }

#     mock_expenses_importer.make.return_value = [mock_parsed_expense]

#     mock_import_expense_request = mocker.patch('app.usecases.expense.ImportExpensesRequest')

#     mock_uploaded_file = mocker.patch('tempfile.SpooledTemporaryFile')
    
#     mock_import_expense_request.uploaded_file = mock_uploaded_file

#     usecase = ImportExpensesUseCase(
#         expense_repo=mock_expense_repo,
#         expenses_importer=mock_expenses_importer,
#         expense_category_repo=mock_expense_category_repo
#     )
#     usecase.execute(mock_import_expense_request)

#     mock_expenses_importer.make.assert_called_once_with(mock_uploaded_file)

#     mock_expense_category_repo.get_by_name.assert_called_once_with(mock_parsed_expense.get('category_name'))
    
#     mock_expense_repo.add.assert_called_once_with(
#         Expense(
#             category=mock_expense_category,
#             amount=mock_parsed_expense.get('amount'),
#             realised_date=mock_parsed_expense.get('realised_date')
#         )
#     )
