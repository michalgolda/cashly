from fastapi.testclient import TestClient

from app import create_app
from app.dependencies import get_user_repo

app = create_app()
client = TestClient(app)

def test_register(mocker):
  mock_user_repo = mocker.patch('app.repositories.user.AbstractUserRepository')
  mock_user_repo.get_by_email.return_value = None

  app.dependency_overrides[get_user_repo] = lambda: mock_user_repo

  response = client.post(
    '/auth/register', 
    json={
      'email': 'test@test.pl', 
      'password': 'test'
    }
  )

  assert response.status_code == 201

def test_create_user_when_email_is_already_used(mocker):
  mock_user_repo = mocker.patch('app.repositories.user.AbstractUserRepository')
  mock_user_repo.get_by_email.return_value = True

  app.dependency_overrides[get_user_repo] = lambda: mock_user_repo

  response = client.post(
    '/auth/register', 
    json={
      'email': 'test@test.pl', 
      'password': 'test'
    }
  )

  assert response.status_code == 400
  assert response.json() == {
	  'code': 'UserEmailAlreadyUsed',
	  'message': 'Użytkownik o podanym adresie email już istnieje'
  }

  
