import pytest
from fastapi.testclient import TestClient

from app import create_app
from app.dependencies import get_user_repo
from app.repositories import MemoryUserRepository

@pytest.fixture(scope='module')
def app(request):
  app = create_app()

  options = getattr(request, 'param', {})
  default_dependency_overrides = {
    get_user_repo: lambda : MemoryUserRepository()
  }
  default_dependency_overrides.update(options.get('dependency_overrides', {}))
  app.dependency_overrides = default_dependency_overrides

  return app

@pytest.fixture(scope='module')
def client(app):
  return TestClient(app)