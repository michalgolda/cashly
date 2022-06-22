import pytest
from app.usecases.user import (
    GetUserByIdUseCase,
    UserNotFoundError
)

def test_get_user_by_id(mocker):
    mock_user_entity = mocker.patch('app.entities.User')
    mock_user_repo = mocker.patch('app.repositories.UserRepository')
    mock_user_repo.get_by_id.return_value = mock_user_entity
    
    mock_get_user_by_id_usecase_input = mocker.patch('app.usecases.user.GetUserByIdUseCaseInput')

    get_user_by_id_usecase = GetUserByIdUseCase(user_repo=mock_user_repo)
    get_user_by_id_usecase_result = get_user_by_id_usecase.execute(mock_get_user_by_id_usecase_input)
    
    assert get_user_by_id_usecase_result.user == mock_user_entity

    mock_user_repo.get_by_id.assert_called_once_with(mock_get_user_by_id_usecase_input.user_id)

def test_get_user_by_id_when_user_not_found(mocker):
    mock_user_repo = mocker.patch('app.repositories.UserRepository')
    mock_user_repo.get_by_id.return_value = None
    
    mock_get_user_by_id_usecase_input = mocker.patch('app.usecases.user.GetUserByIdUseCaseInput')

    get_user_by_id_usecase = GetUserByIdUseCase(user_repo=mock_user_repo)
    with pytest.raises(UserNotFoundError):
        get_user_by_id_usecase.execute(mock_get_user_by_id_usecase_input)

    mock_user_repo.get_by_id.assert_called_once_with(mock_get_user_by_id_usecase_input.user_id)
    