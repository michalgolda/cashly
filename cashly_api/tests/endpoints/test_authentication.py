import pytest

from app.entities import User
from app.repositories import MemoryUserRepository
from app.dependencies import get_user_repo, get_security_manager


security_manager = get_security_manager()

def test_register(client):
  response = client.post('/auth/register', json=dict(email='test@test.pl', password='test'))
  assert response.status_code == 201

@pytest.mark.parametrize(
  'app', 
  [{
    'dependency_overrides': {
      get_user_repo: lambda : MemoryUserRepository([
        User('test@test.pl', password='test')
      ])
    }
  }], 
  indirect=True
)
def test_register_when_user_email_already_used(client):
  response = client.post('/auth/register', json=dict(email='test@test.pl', password='test'))
  assert response.status_code == 400
  assert response.json() == {
    'code': 'UserEmailAlreadyUsedError',
    'message': 'Podany adres email jest już w użyciu'
  }

@pytest.mark.parametrize(
  'app', 
  [{
    'dependency_overrides': {
      get_user_repo: lambda : MemoryUserRepository([
      User(
        'test@test.pl', 
        password=security_manager.generate_password_hash('test')
      )
    ])
    }
  }],
  indirect=True
)
def test_login(client):
  response = client.post('/auth/login', json=dict(email='test@test.pl', password='test'))
  
  assert response.status_code == 200
  assert 'access_token' in response.json()

def test_login_when_user_email_is_wrong(client):
  response = client.post('/auth/login', json=dict(email='test@test.pl', password='test'))
  assert response.status_code == 400
  assert response.json() == {
    'code': 'BadAuthenticationCredentialsError',
    'message': 'Podany adres email lub hasło są nieprawidłowe'
  }

@pytest.mark.parametrize(
  'app',
  [{
    'dependency_overrides': {
      get_user_repo: lambda : MemoryUserRepository([
        User(
          'test@test.pl', 
          password=security_manager.generate_password_hash('test')
        )
      ])
    }
  }],
  indirect=True
)
def test_login_when_password_is_wrong(client):
  response = client.post('/auth/login', json=dict(email='test@test.pl', password='wrong password'))
  assert response.status_code == 400
  assert response.json() == {
    'code': 'BadAuthenticationCredentialsError',
    'message': 'Podany adres email lub hasło są nieprawidłowe'
  }

@pytest.mark.parametrize(
  'app',
  [{
    'dependency_overrides': {
      get_user_repo: lambda : MemoryUserRepository([
        User(
          'test@test.pl', 
          password=security_manager.generate_password_hash('test')
        )
      ])
    }
  }],
  indirect=True
)
def test_password_recovery_request(client):
  response = client.post('/auth/passwordrecovery', json={'email': 'test@test.pl'})
  assert response.status_code == 200

def test_password_recovery_request_when_user_email_is_wrong(client):
  response = client.post('/auth/passwordrecovery', json={'email': 'test@test.pl'})
  assert response.status_code == 404
  assert response.json() == {
    'code': 'UserNotFoundError',
    'message': 'Użytkownik o podanych właściwościach nie istnieje'
  }

@pytest.mark.parametrize(
  'app',
  [{
    'dependency_overrides': {
      get_user_repo: lambda : MemoryUserRepository([
        User(
          'test@test.pl', 
          password=security_manager.generate_password_hash('test')
        )
      ])
    }
  }],
  indirect=True
)
def test_password_recovery_proceed(client):
  reset_password_token = security_manager.generate_reset_password_token('test@test.pl')
  response = client.put(
    '/auth/passwordrecovery', 
    json={
      'password': 'new_password', 
      'reset_password_token': reset_password_token
    }
  )
  assert response.status_code == 200
