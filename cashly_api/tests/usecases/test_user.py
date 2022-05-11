import pytest

from app.usecases.user import GetUserByIdUseCase, UserNotFoundError


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