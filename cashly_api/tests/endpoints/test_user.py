from uuid import uuid4

import pytest

from app.dependencies import get_message_client, get_security_manager, get_user_repo
from app.entities.user import User
from app.messages import MemoryMessageClient
from app.repositories.user import MemoryUserRepository

security_manager = get_security_manager()
message_client = MemoryMessageClient()

user_id = uuid4()


@pytest.mark.parametrize(
    "app",
    [
        {
            "dependency_overrides": {
                get_user_repo: lambda: MemoryUserRepository(
                    [
                        User(
                            id=user_id,
                            email="test@test.pl",
                            password=security_manager.generate_password_hash("test"),
                        )
                    ]
                )
            }
        }
    ],
    indirect=True,
)
def test_get_current_user(client):
    access_token = security_manager.generate_access_token(str(user_id))
    response = client.get(
        "/users/me", headers={"Authorization": f"Bearer {access_token}"}
    )
    assert response.status_code == 200
    assert response.json() == {
        "id": str(user_id),
        "email": "test@test.pl",
        "email_is_verified": False,
    }


@pytest.mark.parametrize(
    "app",
    [
        {
            "dependency_overrides": {
                get_user_repo: lambda: MemoryUserRepository(
                    [User("test@test.pl", password="test")]
                ),
                get_message_client: lambda: message_client,
            }
        }
    ],
    indirect=True,
)
def test_verify_email(client):
    email_verification_token = security_manager.generate_email_verification_token(
        "test@test.pl"
    )
    response = client.post(
        "/users/verify/email",
        json={"email_verification_token": email_verification_token},
    )
    assert response.status_code == 200
    assert len(message_client.output) == 1
    message_client.output = []


@pytest.mark.parametrize(
    "app",
    [
        {
            "dependency_overrides": {
                get_user_repo: lambda: MemoryUserRepository(
                    [User("test@test.pl", password="test")]
                ),
                get_message_client: lambda: message_client,
            }
        }
    ],
    indirect=True,
)
def test_send_email_verification_request(client):
    response = client.post(
        "/users/verify/email/request",
        json={"email": "test@test.pl"},
    )
    assert response.status_code == 200
    assert len(message_client.output) == 1
    message_client.output = []


@pytest.mark.parametrize(
    "app",
    [
        {
            "dependency_overrides": {
                get_user_repo: lambda: MemoryUserRepository(
                    [
                        User("test@test.pl", "test", email_is_verified=True),
                    ]
                ),
                get_message_client: lambda: message_client,
            }
        }
    ],
    indirect=True,
)
def test_send_email_verification_request_when_user_email_is_already_verified(client):
    response = client.post(
        "/users/verify/email/request",
        json={"email": "test@test.pl"},
    )
    assert response.status_code == 200
    assert len(message_client.output) == 0


@pytest.mark.parametrize(
    "app",
    [
        {
            "dependency_overrides": {
                get_user_repo: lambda: MemoryUserRepository(
                    [User("test@test.pl", password="test")]
                ),
                get_message_client: lambda: message_client,
            }
        }
    ],
    indirect=True,
)
def test_send_email_verification_request_when_user_not_found(client):
    response = client.post(
        "/users/verify/email/request",
        json={"email": "xyz@test.pl"},
    )
    assert response.status_code == 404
    assert response.json() == {
        "code": "UserNotFoundError",
        "message": "Użytkownik o podanych właściwościach nie istnieje",
    }
