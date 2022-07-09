import pytest

from uuid import uuid4
from datetime import datetime

from app.entities import User, ExpenseCategory, expense_category
from app.repositories import MemoryExpenseCategoryRepository
from app.dependencies import get_current_user, get_expense_category_repo


user = User(id=uuid4(), email='test@test.pl', password='test')
expense_category = ExpenseCategory(
    id=uuid4(), 
    name='test', 
    color='#fff', 
    user=user, 
    created_at=datetime.utcnow().isoformat()
)

@pytest.mark.parametrize(
    'app',
    [{
        'dependency_overrides': {
            get_current_user: lambda : user,
            get_expense_category_repo: lambda : MemoryExpenseCategoryRepository([expense_category])
        }
    }],
    indirect=True
)
def test_get_all_expense_categories(client):
    response = client.get('/expense_categories')

    assert response.status_code == 200
    assert response.json() == [{
        'id': str(expense_category.id),
        'name': 'test',
        'color': '#fff',
        'created_at': str(expense_category.created_at),
        'updated_at': None
    }]

@pytest.mark.parametrize(
    'app',
    [{
        'dependency_overrides': {
            get_current_user: lambda : user,
            get_expense_category_repo: lambda : MemoryExpenseCategoryRepository([])
        }
    }],
    indirect=True
)
def test_create_expense_category(client):
    response = client.post('/expense_categories', json=dict(name='test', color='#fff'))
    response_data = response.json()
    
    assert response.status_code == 201
    assert response_data['name'] == 'test'
    assert response_data['color'] == '#fff'

@pytest.mark.parametrize(
    'app',
    [{
        'dependency_overrides': {
            get_current_user: lambda : user,
            get_expense_category_repo: lambda : MemoryExpenseCategoryRepository([expense_category])
        }
    }],
    indirect=True
)
def test_update_expense_category(client):
    response = client.put(f'/expense_categories/{str(expense_category.id)}', json=dict(name='xyz', color='#f00'))
    response_data = response.json()

    assert response.status_code == 200
    assert response_data['name'] == 'xyz'
    assert response_data['color'] == '#f00'

@pytest.mark.parametrize(
    'app',
    [{
        'dependency_overrides': {
            get_current_user: lambda : user,
            get_expense_category_repo: lambda : MemoryExpenseCategoryRepository([expense_category])
        }
    }],
    indirect=True
)
def test_delete_expense_category(client):
    response = client.delete(f'/expense_categories/{str(expense_category.id)}')
    assert response.status_code == 200

# def test_get_all_expense_categories(mocker):
#     expense_categories = [
#         ExpenseCategory(
#             id=uuid4(),
#             name='test1',
#             color='#fff',
#             created_at=datetime.now()
#         ),
#         ExpenseCategory(
#             id=uuid4(),
#             name='test2',
#             color='#000',
#             created_at=datetime.now()
#         )
#     ]

#     mock_expense_category_repo = mocker.patch('app.repositories.AbstractExpenseCategoryRepository')
#     mock_expense_category_repo.get_all.return_value = expense_categories

#     app.dependency_overrides[get_expense_category_repo] = lambda: mock_expense_category_repo

#     response = client.get('/expense_categories/')

#     assert response.status_code == 200

#     response_data = response.json()

#     assert response_data == [
#         {
#             'name': 'test1',
#             'color': '#fff',
#             'id': str(expense_categories[0].id),
#             'created_at': expense_categories[0].created_at.isoformat(),
#             'updated_at': None
#         },
#         {
#             'name': 'test2',
#             'color': '#000',
#             'id': str(expense_categories[1].id),
#             'created_at': expense_categories[1].created_at.isoformat(),
#             'updated_at': None
#         },
#     ]


# def test_get_expense_category_by_id(mocker):
#     expense_category = ExpenseCategory(
#         id=uuid4(),
#         name='test1',
#         color='#fff',
#         created_at=datetime.now()
#     )

#     mock_expense_category_repo = mocker.patch('app.repositories.AbstractExpenseCategoryRepository')
#     mock_expense_category_repo.get_by_id.return_value = expense_category

#     app.dependency_overrides[get_expense_category_repo] = lambda: mock_expense_category_repo

#     response = client.get(f'/expense_categories/{str(expense_category.id)}')

#     assert response.status_code == 200

#     response_data = response.json()

#     assert response_data == {
#         'name': 'test1',
#         'color': '#fff',
#         'id': str(expense_category.id),
#         'created_at': expense_category.created_at.isoformat(),
#         'updated_at': None
#     }


# def test_get_expense_category_by_id_when_category_not_found(mocker):
#     mock_expense_category_repo = mocker.patch('app.repositories.AbstractExpenseCategoryRepository')
#     mock_expense_category_repo.get_by_id.return_value = None

#     app.dependency_overrides[get_expense_category_repo] = lambda: mock_expense_category_repo

#     response = client.get(f'/expense_categories/3d0f6f81-9639-4cc8-97ad-5421061d3e63')

#     assert response.status_code == 404

#     response_data = response.json()

#     assert response_data == {
#         'code': 'ExpenseCategoryNotFound',
#         'message': 'Kategoria o podanym id 3d0f6f81-9639-4cc8-97ad-5421061d3e63 nie istnieje'
#     }


# def test_create_expense_category(mocker):
#     expense_category_id = str(uuid4())
#     expense_category_created_at = datetime.now()

#     mock_expense_category_repo = mocker.patch('app.repositories.AbstractExpenseCategoryRepository')
#     mock_expense_category_repo.get_by_name.return_value = None

#     def add_side_effect(expense_category):
#         expense_category.id = expense_category_id
#         expense_category.created_at = expense_category_created_at

#     mock_expense_category_repo.add.side_effect = add_side_effect

#     app.dependency_overrides[get_expense_category_repo] = lambda: mock_expense_category_repo

#     response = client.post('/expense_categories/', json={'name': 'test1', 'color': '#fff'})

#     assert response.status_code == 201

#     response_data = response.json()

#     assert response_data == {
#         'name': 'test1',
#         'color': '#fff',
#         'id': str(expense_category_id),
#         'created_at': expense_category_created_at.isoformat(),
#         'updated_at': None
#     }


# def test_create_expense_category_when_name_is_already_used(mocker):
#     mock_expense_category_repo = mocker.patch('app.repositories.AbstractExpenseCategoryRepository')
#     mock_expense_category_repo.get_by_name.return_value = True

#     app.dependency_overrides[get_expense_category_repo] = lambda: mock_expense_category_repo

#     response = client.post('/expense_categories/', json={'name': 'test1', 'color': '#fff'})

#     assert response.status_code == 419

#     response_data = response.json()

#     assert response_data == {
#         'code': 'ExpenseCategoryNameIsAlreadyUsed',
#         'message': 'Nazwa kategorii test1 jest już w użyciu',
#     }


# def test_update_expense_category(mocker):
#     expense_category = ExpenseCategory(
#         id=uuid4(),
#         name='test',
#         color='#000',
#         created_at=datetime.now()
#     )

#     mock_expense_category_repo = mocker.patch('app.repositories.AbstractExpenseCategoryRepository')
#     mock_expense_category_repo.get_by_name.return_value = False
#     mock_expense_category_repo.get_by_id.return_value = expense_category

#     def save_side_effect(new_expense_category):
#         new_expense_category.name = 'test1'
#         new_expense_category.color = '#fff'

#     mock_expense_category_repo.save.side_effect = save_side_effect

#     app.dependency_overrides[get_expense_category_repo] = lambda: mock_expense_category_repo

#     response = client.put(
#         f'/expense_categories/{str(expense_category.id)}/',
#         json={'name': 'test1', 'color': '#fff'}
#     )

#     assert response.status_code == 200

#     response_data = response.json()

#     assert response_data == {
#         'name': 'test1',
#         'color': '#fff',
#         'id': str(expense_category.id),
#         'created_at': expense_category.created_at.isoformat(),
#         'updated_at': None
#     }


# def test_update_expense_category_when_category_not_found(mocker):
#     mock_expense_category_repo = mocker.patch('app.repositories.AbstractExpenseCategoryRepository')
#     mock_expense_category_repo.get_by_id.return_value = None

#     app.dependency_overrides[get_expense_category_repo] = lambda: mock_expense_category_repo

#     response = client.put(
#         f'/expense_categories/3d0f6f81-9639-4cc8-97ad-5421061d3e63/',
#         json={'name': 'test1', 'color': '#fff'}
#     )

#     assert response.status_code == 404

#     response_data = response.json()

#     assert response_data == {
#         'code': 'ExpenseCategoryNotFound',
#         'message': 'Kategoria o podanym id 3d0f6f81-9639-4cc8-97ad-5421061d3e63 nie istnieje'
#     }


# def test_update_expense_category_when_name_is_already_used(mocker):
#     mock_expense_category_repo = mocker.patch('app.repositories.AbstractExpenseCategoryRepository')
#     mock_expense_category_repo.get_by_name.return_value = True

#     app.dependency_overrides[get_expense_category_repo] = lambda: mock_expense_category_repo

#     response = client.put(
#         f'/expense_categories/3d0f6f81-9639-4cc8-97ad-5421061d3e63/',
#         json={'name': 'test1', 'color': '#fff'}
#     )

#     assert response.status_code == 419

#     response_data = response.json()

#     assert response_data == {
#         'code': 'ExpenseCategoryNameIsAlreadyUsed',
#         'message': 'Nazwa kategorii test1 jest już w użyciu'
#     }


# def test_delete_expense_category(mocker):
#     mock_expense_category_repo = mocker.patch('app.repositories.AbstractExpenseCategoryRepository')
#     mock_expense_category_repo.get_by_id.return_value = True

#     app.dependency_overrides[get_expense_category_repo] = lambda: mock_expense_category_repo

#     response = client.delete(
#         f'/expense_categories/3d0f6f81-9639-4cc8-97ad-5421061d3e63/',
#         json={'name': 'test1', 'color': '#fff'}
#     )

#     assert response.status_code == 200

#     response_data = response.json()

#     assert response_data == None


# def test_delete_expense_category_when_category_not_found(mocker):
#     mock_expense_category_repo = mocker.patch('app.repositories.AbstractExpenseCategoryRepository')
#     mock_expense_category_repo.get_by_id.return_value = False

#     app.dependency_overrides[get_expense_category_repo] = lambda: mock_expense_category_repo

#     response = client.delete(
#         f'/expense_categories/3d0f6f81-9639-4cc8-97ad-5421061d3e63/',
#         json={'name': 'test1', 'color': '#fff'}
#     )

#     assert response.status_code == 404

#     response_data = response.json()

#     assert response_data == {
#         'code': 'ExpenseCategoryNotFound',
#         'message': 'Kategoria o podanym id 3d0f6f81-9639-4cc8-97ad-5421061d3e63 nie istnieje'
#     }
