import pytest
from uuid import uuid4

from app.entities.user import User
from app.repositories.user import MemoryUserRepository
from app.dependencies import get_user_repo, get_security_manager

security_manager = get_security_manager()

user_id = uuid4()

@pytest.mark.parametrize(
  'app',
  [{
    'dependency_overrides': {
      get_user_repo: lambda : MemoryUserRepository([
        User(
          id=user_id,
          email='test@test.pl', 
          password=security_manager.generate_password_hash('test')
        )
      ])
    }
  }],
  indirect=True
)
def test_get_current_user(client):
  access_token = security_manager.generate_access_token(str(user_id))
  response = client.get('/users/me', headers={'Authorization': f'Bearer {access_token}'})
  assert response.status_code == 200
  assert response.json() == {
    'id': str(user_id),
    'email': 'test@test.pl'
  }
