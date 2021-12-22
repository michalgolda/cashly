from uuid import uuid4
from datetime import datetime, date
from fastapi.testclient import TestClient

from app import create_app
from app.entities import Expense, ExpenseCategory
from app.dependencies import get_expense_repo, get_expense_category_repo


app = create_app()
client = TestClient(app)


def test_get_all_expenses(mocker):
    expenses = [
        Expense(
            id=uuid4(),
            amount=100,
            realised_date=date.today(),
            created_at=datetime.now()
        ),
        Expense(
            id=uuid4(),
            amount=120,
            category=ExpenseCategory(
                id=uuid4(),
                name='test',
                color='#fff',
                created_at=datetime.now()
            ),
            realised_date=date.today(),
            created_at=datetime.now()
        )
    ]

    mock_expense_repo = mocker.patch('app.repositories.AbstractExpenseRepository')
    mock_expense_repo.get_all.return_value = expenses

    app.dependency_overrides[get_expense_repo] = lambda: mock_expense_repo

    response = client.get('/expenses/')

    assert response.status_code == 200

    response_data = response.json()

    assert response_data == [
        {
            'id': str(expenses[0].id),
            'amount': 100.0,
            'category': None,
            'realised_date': expenses[0].realised_date.isoformat(),
            'created_at': expenses[0].created_at.isoformat(),
            'updated_at': None
        },
        {
            'id': str(expenses[1].id),
            'amount': 120.0,
            'realised_date': expenses[1].realised_date.isoformat(),
            'category': {
                'id': str(expenses[1].category.id),
                'name': 'test',
                'color': '#fff',
                'created_at': expenses[1].category.created_at.isoformat(),
                'updated_at': None
            },
            'created_at': expenses[1].created_at.isoformat(),
            'updated_at': None
        }
    ]


def test_get_expense_by_id(mocker):
    expense = Expense(
        id=uuid4(),
        amount=120,
        category=ExpenseCategory(
            id=uuid4(),
            name='test',
            color='#fff',
            created_at=datetime.now()
        ),
        realised_date=date.today(),
        created_at=datetime.now()
    )

    mock_expense_repo = mocker.patch('app.repositories.AbstractExpenseRepository')
    mock_expense_repo.get_by_id.return_value = expense

    app.dependency_overrides[get_expense_repo] = lambda: mock_expense_repo

    response = client.get('/expenses/3d0f6f81-9639-4cc8-97ad-5421061d3e63/')

    assert response.status_code == 200

    response_data = response.json()

    assert response_data == {
        'id': str(expense.id),
        'amount': 120.0,
        'realised_date': expense.realised_date.isoformat(),
        'category': {
            'id': str(expense.category.id),
                'name': 'test',
                'color': '#fff',
                'created_at': expense.category.created_at.isoformat(),
                'updated_at': None
            },
            'created_at': expense.created_at.isoformat(),
            'updated_at': None
        }


def test_get_expense_by_id_when_expense_not_found(mocker):
    mock_expense_repo = mocker.patch('app.repositories.AbstractExpenseRepository')
    mock_expense_repo.get_by_id.return_value = None

    app.dependency_overrides[get_expense_repo] = lambda: mock_expense_repo

    response = client.get('/expenses/3d0f6f81-9639-4cc8-97ad-5421061d3e63/')

    assert response.status_code == 404

    response_data = response.json()

    assert response_data == {
        'code': 'ExpenseNotFound',
        'message': 'Nie znaleziono wydatku o podanym id 3d0f6f81-9639-4cc8-97ad-5421061d3e63'
    }


def test_create_expense(mocker):
    expense_id = uuid4()
    expense_created_at = datetime.now()

    def add_side_effect(expense):
       expense.id = expense_id
       expense.created_at = expense_created_at

    mock_expense_repo = mocker.patch('app.repositories.AbstractExpenseRepository')
    mock_expense_repo.add.side_effect = add_side_effect

    mock_expense_category_repo = mocker.patch('app.repositories.AbstractExpenseCategoryRepository')

    expense_category = ExpenseCategory(
        id=uuid4(),
        name='test',
        color='#fff',
        created_at=datetime.now()
    )

    mock_expense_category_repo.get_by_id.return_value = expense_category

    app.dependency_overrides[get_expense_repo] = lambda: mock_expense_repo
    app.dependency_overrides[get_expense_category_repo] = lambda: mock_expense_category_repo

    response = client.post(
        '/expenses/',
        json={
            'amount': 100,
            'realised_date': date.today().isoformat(),
            'expense_category_id': '3d0f6f81-9639-4cc8-97ad-5421061d3e63'
        }
    )

    assert response.status_code == 201

    response_data = response.json()

    assert response_data == {
        'id': str(expense_id),
        'amount': 100,
        'realised_date': date.today().isoformat(),
        'category': {
            'id': str(expense_category.id),
            'name': 'test',
            'color': '#fff',
            'created_at': expense_category.created_at.isoformat(),
            'updated_at': None
        },
        'created_at': expense_created_at.isoformat(),
        'updated_at': None
    }


def test_create_expense_when_category_not_found(mocker):
    mock_expense_repo = mocker.patch('app.repositories.AbstractExpenseRepository')

    mock_expense_category_repo = mocker.patch('app.repositories.AbstractExpenseCategoryRepository')
    mock_expense_category_repo.get_by_id.return_value = None

    app.dependency_overrides[get_expense_repo] = lambda: mock_expense_repo
    app.dependency_overrides[get_expense_category_repo] = lambda: mock_expense_category_repo

    response = client.post(
        '/expenses/',
        json={
            'amount': 100,
            'realised_date': date.today().isoformat(),
            'expense_category_id': '3d0f6f81-9639-4cc8-97ad-5421061d3e63'
        }
    )

    assert response.status_code == 404

    response_data = response.json()

    assert response_data == {
        'code': 'ExpenseCategoryNotFound',
        'message': 'Kategoria o podanym id 3d0f6f81-9639-4cc8-97ad-5421061d3e63 nie istnieje'
    }


def test_update_expense(mocker):
    expense_category = ExpenseCategory(
        id=uuid4(),
        name='test',
        color='#fff',
        created_at=datetime.now()
    )

    expense = Expense(
        id=uuid4(),
        amount=100,
        realised_date=date.today(),
        category=expense_category,
        created_at=datetime.now()
    )

    mock_expense_repo = mocker.patch('app.repositories.AbstractExpenseRepository')
    mock_expense_repo.get_by_id.return_value = expense

    def save_side_effect(expense):
        expense.amount = 120

    mock_expense_repo.save.side_effect = save_side_effect

    mock_expense_category_repo = mocker.patch('app.repositories.AbstractExpenseCategoryRepository')

    mock_expense_category_repo.get_by_id.return_value = expense_category

    app.dependency_overrides[get_expense_repo] = lambda: mock_expense_repo
    app.dependency_overrides[get_expense_category_repo] = lambda: mock_expense_category_repo

    response = client.put(
        '/expenses/3d0f6f81-9639-4cc8-97ad-5421061d3e63/',
        json={
            'amount': 100,
            'realised_date': date.today().isoformat(),
            'expense_category_id': '3d0f6f81-9639-4cc8-97ad-5421061d3e63'
        }
    )

    assert response.status_code == 200

    response_data = response.json()

    assert response_data == {
        'id': str(expense.id),
        'amount': 120,
        'realised_date': date.today().isoformat(),
        'category': {
            'id': str(expense_category.id),
            'name': 'test',
            'color': '#fff',
            'created_at': expense_category.created_at.isoformat(),
            'updated_at': None
        },
        'created_at': expense.created_at.isoformat(),
        'updated_at': None
    }


def test_update_expense_when_expense_not_found(mocker):
    mock_expense_repo = mocker.patch('app.repositories.AbstractExpenseRepository')
    mock_expense_repo.get_by_id.return_value = None

    mock_expense_category_repo = mocker.patch('app.repositories.AbstractExpenseCategoryRepository')

    app.dependency_overrides[get_expense_repo] = lambda: mock_expense_repo
    app.dependency_overrides[get_expense_category_repo] = lambda: mock_expense_category_repo

    response = client.put(
        '/expenses/3d0f6f81-9639-4cc8-97ad-5421061d3e63/',
        json={
            'amount': 100,
            'realised_date': date.today().isoformat(),
            'expense_category_id': '3d0f6f81-9639-4cc8-97ad-5421061d3e63'
        }
    )

    assert response.status_code == 404

    response_data = response.json()

    assert response_data == {
        'code': 'ExpenseNotFound',
        'message': 'Nie znaleziono wydatku o podanym id 3d0f6f81-9639-4cc8-97ad-5421061d3e63'
    }


def test_update_expense_when_category_not_found(mocker):
    mock_expense_repo = mocker.patch('app.repositories.AbstractExpenseRepository')
    mock_expense_repo.get_by_id.return_value = True

    mock_expense_category_repo = mocker.patch('app.repositories.AbstractExpenseCategoryRepository')
    mock_expense_category_repo.get_by_id.return_value = False

    app.dependency_overrides[get_expense_repo] = lambda: mock_expense_repo
    app.dependency_overrides[get_expense_category_repo] = lambda: mock_expense_category_repo

    response = client.put(
        '/expenses/3d0f6f81-9639-4cc8-97ad-5421061d3e63/',
        json={
            'amount': 100,
            'realised_date': date.today().isoformat(),
            'expense_category_id': '3d0f6f81-9639-4cc8-97ad-5421061d3e63'
        }
    )

    assert response.status_code == 404

    response_data = response.json()

    assert response_data == {
        'code': 'ExpenseCategoryNotFound',
        'message': 'Kategoria o podanym id 3d0f6f81-9639-4cc8-97ad-5421061d3e63 nie istnieje'
    }


def test_delete_expense(mocker):
    mock_expense_repo = mocker.patch('app.repositories.AbstractExpenseRepository')
    mock_expense_repo.get_by_id.return_value = True

    app.dependency_overrides[get_expense_repo] = lambda: mock_expense_repo

    response = client.delete('/expenses/3d0f6f81-9639-4cc8-97ad-5421061d3e63/')

    assert response.status_code == 200

    response_data = response.json()

    assert response_data == None


def test_delete_expense_when_expense_not_found(mocker):
    mock_expense_repo = mocker.patch('app.repositories.AbstractExpenseRepository')
    mock_expense_repo.get_by_id.return_value = False

    app.dependency_overrides[get_expense_repo] = lambda: mock_expense_repo

    response = client.delete('/expenses/3d0f6f81-9639-4cc8-97ad-5421061d3e63/')

    assert response.status_code == 404

    response_data = response.json()

    assert response_data == {
        'code': 'ExpenseNotFound',
        'message': 'Nie znaleziono wydatku o podanym id 3d0f6f81-9639-4cc8-97ad-5421061d3e63'
    }
