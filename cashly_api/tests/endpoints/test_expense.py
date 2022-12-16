from datetime import date, datetime
from uuid import uuid4

import pytest

from app.dependencies import (
    get_current_user,
    get_expense_category_repo,
    get_expense_repo,
)
from app.entities import Expense, ExpenseCategory, User
from app.repositories.expense import MemoryExpenseRepository
from app.repositories.expense_category import MemoryExpenseCategoryRepository

user = User(id=uuid4(), email='test@test.pl', password='test')
expense_category = ExpenseCategory(
    id=uuid4(), 
    name='test', 
    color='#fff', 
    user=user, 
    created_at=datetime.utcnow().isoformat()
)
expense = Expense(
    id=uuid4(),
    amount=100,
    realised_date=date.today(),
    user=user,
    category=expense_category
)

@pytest.mark.parametrize(
    'app',
    [{
        'dependency_overrides': {
            get_current_user: lambda : user,
            get_expense_repo: lambda : MemoryExpenseRepository([expense])
        }
    }],
    indirect=True
)
def test_get_all_expenses(client):
    response = client.get('/expenses')
    assert response.status_code == 200
    assert response.json() == [{
        'id': str(expense.id),
        'amount': 100.0,
        'realised_date': str(expense.realised_date),
        'category': {
            'id': str(expense_category.id),
            'name': 'test',
            'color': '#fff',
            'created_at': str(expense_category.created_at),
            'updated_at': None
        }
    }]

@pytest.mark.parametrize(
    'app',
    [{
        'dependency_overrides': {
            get_current_user: lambda : user,
            get_expense_repo: lambda : MemoryExpenseRepository()
        }
    }],
    indirect=True
)
def test_create_expense(client):
    response = client.post('/expenses', json=dict(amount=100, realised_date=str(date.today())))
    response_data = response.json()
    assert response.status_code == 201
    assert response_data['amount'] == 100.0
    assert response_data['realised_date'] == str(date.today())
    assert response_data['category'] == None

@pytest.mark.parametrize(
    'app',
    [{
        'dependency_overrides': {
            get_current_user: lambda : user,
            get_expense_repo: lambda : MemoryExpenseRepository(),
            get_expense_category_repo: lambda : MemoryExpenseCategoryRepository([expense_category])
        }
    }],
    indirect=True
)
def test_create_expense_with_category(client):
    response = client.post(
        '/expenses', 
        json=dict(
            amount=100, 
            realised_date=str(date.today()), 
            expense_category_id=str(expense_category.id)
        )
    )
    response_data = response.json()
    assert response.status_code == 201
    assert response_data['amount'] == 100.0
    assert response_data['realised_date'] == str(date.today())
    assert response_data['category']['name'] == 'test'
    assert response_data['category']['color'] == '#fff'

@pytest.mark.parametrize(
    'app',
    [{
        'dependency_overrides': {
            get_current_user: lambda : user,
            get_expense_repo: lambda : MemoryExpenseRepository(),
            get_expense_category_repo: lambda : MemoryExpenseCategoryRepository([expense_category])
        }
    }],
    indirect=True
)
def test_create_expense_with_category_when_category_not_found(client):
    response = client.post(
        '/expenses', 
        json=dict(
            amount=100, 
            realised_date=str(date.today()), 
            expense_category_id=str(uuid4())
        )
    )
    response_data = response.json()
    assert response.status_code == 404
    assert response_data['code'] == 'ExpenseCategoryNotFoundError'

@pytest.mark.parametrize(
    'app',
    [{
        'dependency_overrides': {
            get_current_user: lambda : user,
            get_expense_repo: lambda : MemoryExpenseRepository([expense])
        }
    }],
    indirect=True
)
def test_delete_expense(client):
    response = client.delete(f'/expenses/{expense.id}')
    assert response.status_code == 200

@pytest.mark.parametrize(
    'app',
    [{
        'dependency_overrides': {
            get_current_user: lambda : user,
            get_expense_repo: lambda : MemoryExpenseRepository()
        }
    }],
    indirect=True
)
def test_delete_expense_when_expense_not_found(client):
    response = client.delete(f'/expenses/{str(uuid4())}')
    assert response.status_code == 404

@pytest.mark.parametrize(
    'app',
    [{
        'dependency_overrides': {
            get_current_user: lambda : user,
            get_expense_repo: lambda : MemoryExpenseRepository([expense]),
            get_expense_category_repo: lambda : MemoryExpenseCategoryRepository()
        }
    }],
    indirect=True
)
def test_update_expense(client):
    response = client.put(
        f'/expenses/{str(expense.id)}', 
        json=dict(
            amount=10, 
            expense_category_id=None,
            realised_date=date.today().isoformat()
        )
    )
    response_data = response.json()
    assert response.status_code == 200
    assert response_data['amount'] == 10
    assert response_data['category'] == None

@pytest.mark.parametrize(
    'app',
    [{
        'dependency_overrides': {
            get_current_user: lambda : user,
            get_expense_repo: lambda : MemoryExpenseRepository([expense]),
            get_expense_category_repo: lambda : MemoryExpenseCategoryRepository()
        }
    }],
    indirect=True
)
def test_update_expense_when_expense_not_found(client):
    response = client.put(
        f'/expenses/{str(uuid4())}', 
        json=dict(
            amount=10,  
            expense_category_id=None,
            realised_date=date.today().isoformat()
        )
    )
    assert response.status_code == 404

@pytest.mark.parametrize(
    'app',
    [{
        'dependency_overrides': {
            get_current_user: lambda : user,
            get_expense_repo: lambda : MemoryExpenseRepository([expense]),
            get_expense_category_repo: lambda : MemoryExpenseCategoryRepository()
        }
    }],
    indirect=True
)
def test_update_expense_when_expense_category_not_found(client):
    response = client.put(
        f'/expenses/{str(expense.id)}', 
        json=dict(
            amount=10,
            expense_category_id=str(uuid4()),
            realised_date=date.today().isoformat()
        )
    )
    assert response.status_code == 404
