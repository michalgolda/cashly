import pytest

from app.usecases.user import (
    GetUserByIdUseCase,
    UserNotFoundError,
    CreateUserUseCase,
    UserEmailAlreadyUsedError
)
from app.entities import User


def test_get_user_by_id(mocker):
    mock_user = mocker.patch('app.entities.User')
    mock_user_repo = mocker.patch('app.repositories.AbstractUserRepository')
    mock_user_repo.get_by_id.return_value = mock_user

    usecase = GetUserByIdUseCase(user_repo=mock_user_repo)
    mock_usecase_request = mocker.patch('app.usecases.user.GetUserByIdRequest')
    result = usecase.execute(mock_usecase_request)

    mock_user_repo.get_by_id.assert_called_once_with(mock_usecase_request.user_id)

    assert result.user == mock_user


def test_get_user_by_id_when_user_not_found(mocker):
    mock_user_repo = mocker.patch('app.repositories.AbstractUserRepository')
    mock_user_repo.get_by_id.return_value = None

    usecase = GetUserByIdUseCase(user_repo=mock_user_repo)
    mock_usecase_request = mocker.patch('app.usecases.user.GetUserByIdRequest')

    with pytest.raises(UserNotFoundError):
        usecase.execute(mock_usecase_request)

    mock_user_repo.get_by_id.assert_called_once_with(mock_usecase_request.user_id)


def test_create_user(mocker):
    mock_user_repo = mocker.patch('app.repositories.user.AbstractUserRepository')
    mock_user_repo.get_by_email.return_value = None

    mock_usecase_request = mocker.patch('app.usecases.user.CreateUserRequest')
    create_user_usecase = CreateUserUseCase(user_repo=mock_user_repo)
    result = create_user_usecase.execute(mock_usecase_request)

    mock_user_repo.get_by_email.assert_called_once_with(mock_usecase_request.email)

    mock_user_repo.add.assert_called_once_with(
        User(
            email=mock_usecase_request.email,
            password=mock_usecase_request.password
        )
    )

    assert result.user.email == mock_usecase_request.email
    assert result.user.password == mock_usecase_request.password