import pytest
from app import interactors, schemas


def test_create_spend_category_interactor(mocker):
    mock_spend_category = mocker.MagicMock(id="123")

    mock_spend_category_repo = mocker.patch(
        "app.repositories.SpendCategoryRepository"
    )

    mock_spend_category_repo.add.return_value = mock_spend_category

    interactor = interactors.CreateSpendCategoryInteractor(
        spend_category_repo=mock_spend_category_repo
    )
    
    created_spend_category = interactor.execute(
        spend_category=mock_spend_category
    )

    mock_spend_category_repo.add.assert_called_once_with(mock_spend_category)

    assert created_spend_category == mock_spend_category

@pytest.mark.skip(reason="This feature is not implemeneted")
def test_create_spend_category_interactor_when_spend_category_name_is_already_used(mocker):
    pass

def test_delete_spend_category_interactor(mocker):
    mock_spend_category = mocker.MagicMock(id="123")

    mock_spend_category_repo = mocker.patch("app.repositories.SpendCategoryRepository")

    mock_spend_category_repo.get.return_value = mock_spend_category
    mock_spend_category_repo.delete.return_value = mock_spend_category

    interactor = interactors.DeleteSpendCategoryInteractor(
        spend_category_repo=mock_spend_category_repo
    )

    deleted_spend_category = interactor.execute(
        spend_category_id=mock_spend_category.id
    )

    mock_spend_category_repo.get.assert_called_once_with(
        mock_spend_category.id
    )

    mock_spend_category_repo.delete.assert_called_once_with(
        mock_spend_category
    )

    assert deleted_spend_category == mock_spend_category

def test_delete_spend_category_interactor_when_spend_category_not_found(mocker):
    mock_spend_category = mocker.MagicMock(id="123")

    mock_spend_category_repo = mocker.patch("app.repositories.SpendCategoryRepository")
    mock_spend_category_repo.get.return_value = None

    interactor = interactors.DeleteSpendCategoryInteractor(
        spend_category_repo=mock_spend_category_repo
    )

    with pytest.raises(interactors.LogicException):
        interactor.execute(spend_category_id=mock_spend_category.id)

    mock_spend_category_repo.get.assert_called_once_with(mock_spend_category.id)

def test_get_all_spend_categories_interactor(mocker):
    mock_spend_category = mocker.MagicMock(id="123")

    mock_spend_category_repo = mocker.patch("app.repositories.SpendCategoryRepository")
    mock_spend_category_repo.list.return_value = [mock_spend_category]

    interactor = interactors.GetAllSpendCategoriesInteractor(
        spend_category_repo=mock_spend_category_repo
    )

    existing_spend_categories = interactor.execute()

    mock_spend_category_repo.list.assert_called_once()

    assert existing_spend_categories == [mock_spend_category]

def test_get_spend_category_by_id_interactor(mocker):
    mock_spend_category = mocker.MagicMock(id="123")

    mock_spend_category_repo = mocker.patch("app.repositories.SpendCategoryRepository")
    mock_spend_category_repo.get.return_value = mock_spend_category

    interactor = interactors.GetSpendCategoryByIdInteractor(
        spend_category_repo=mock_spend_category_repo
    )

    existing_spend_category = interactor.execute(
        spend_category_id=mock_spend_category.id
    )

    mock_spend_category_repo.get.assert_called_once_with(mock_spend_category.id)

    assert existing_spend_category == mock_spend_category

def test_get_spend_category_by_id_interactor_when_spend_category_not_found(mocker):
    mock_spend_category = mocker.MagicMock(id="123")

    mock_spend_category_repo = mocker.patch("app.repositories.SpendCategoryRepository")
    mock_spend_category_repo.get.return_value = None

    interactor = interactors.GetSpendCategoryByIdInteractor(
        spend_category_repo=mock_spend_category_repo
    )

    with pytest.raises(interactors.LogicException):
        interactor.execute(
            spend_category_id=mock_spend_category.id
        )

    mock_spend_category_repo.get.assert_called_once_with(mock_spend_category.id)


def test_create_spend_interactor(mocker):
    mock_spend = mocker.MagicMock(spend_category_id=None)

    mock_spend_repo = mocker.patch("app.repositories.SpendRepository")
    mock_spend_category_repo = mocker.patch("app.repositories.SpendCategoryRepository")

    mock_spend_repo.add.return_value = mock_spend

    interactor = interactors.CreateSpendInteractor(
        spend_repo=mock_spend_repo,
        spend_category_repo=mock_spend_category_repo
    )

    created_spend = interactor.execute(mock_spend)

    mock_spend_repo.add.assert_called_once_with(
        mock_spend,
        spend_category=None
    )

    assert created_spend == mock_spend

def test_create_spend_with_spend_category(mocker):
    mock_spend = mocker.MagicMock(spend_category_id="123")
    mock_spend_category = mocker.MagicMock()

    mock_spend_repo = mocker.patch("app.repositories.SpendRepository")
    mock_spend_category_repo = mocker.patch("app.repositories.SpendCategoryRepository")

    mock_spend_repo.add.return_value = mock_spend
    mock_spend_category_repo.get.return_value = mock_spend_category

    interactor = interactors.CreateSpendInteractor(
        spend_repo=mock_spend_repo,
        spend_category_repo=mock_spend_category_repo
    )

    created_spend = interactor.execute(mock_spend)

    mock_spend_category_repo.get.assert_called_once_with(spend_category_id="123")

    mock_spend_repo.add.assert_called_once_with(
        mock_spend,
        spend_category=mock_spend_category
    )

    assert created_spend == mock_spend

def test_create_spend_with_spend_category_when_category_not_found(mocker):
    mock_spend = mocker.MagicMock(spend_category_id="123")
    mock_spend_category = mocker.MagicMock()

    mock_spend_repo = mocker.patch("app.repositories.SpendRepository")
    mock_spend_category_repo = mocker.patch("app.repositories.SpendCategoryRepository")

    mock_spend_repo.add.return_value = mock_spend
    mock_spend_category_repo.get.return_value = None

    interactor = interactors.CreateSpendInteractor(
        spend_repo=mock_spend_repo,
        spend_category_repo=mock_spend_category_repo
    )

    with pytest.raises(interactors.LogicException):
        interactor.execute(mock_spend)

# def test_create_spend_interactor_when_spend_category_not_found(mocker):
#     mock_spend = mocker.MagicMock(spend_category_id="123")
#     mock_spend_category = mocker.MagicMock()

#     mock_spend_repo = mocker.patch("app.repositories.SpendRepository")
#     mock_spend_category_repo = mocker.patch("app.repositories.SpendCategoryRepository")

#     mock_spend_category_repo.get.return_value = None

#     interactor = interactors.CreateSpendInteractor(
#         spend_repo=mock_spend_repo,
#         spend_category_repo=None
#     )

#     with pytest.raises(interactors.LogicException):
#         interactor.execute(spend=mock_spend)

#     mock_spend_category_repo.get.assert_called_once_with(
#        spend_category_id= mock_spend.spend_category_id
#     )

def test_delete_spend_interactor(mocker):
    mock_spend = mocker.MagicMock(id="123")

    mock_spend_repo = mocker.patch("app.repositories.SpendRepository")
    mock_spend_repo.get.return_value = mock_spend
    mock_spend_repo.delete.return_value = mock_spend

    interactor = interactors.DeleteSpendInteractor(
        spend_repo=mock_spend_repo,
    )

    deleted_spend = interactor.execute(spend_id=mock_spend.id)

    mock_spend_repo.get.assert_called_once_with(mock_spend.id)

    mock_spend_repo.delete.assert_called_once_with(mock_spend)

    assert deleted_spend == mock_spend

def test_delete_spend_interactor_when_spend_not_found(mocker):
    mock_spend = mocker.MagicMock(id="123")

    mock_spend_repo = mocker.patch("app.repositories.SpendRepository")
    mock_spend_repo.get.return_value = None

    interactor = interactors.DeleteSpendInteractor(
        spend_repo=mock_spend_repo,
    )

    with pytest.raises(interactors.LogicException):
        interactor.execute(spend_id=mock_spend.id)

    mock_spend_repo.get.assert_called_once_with(mock_spend.id)

def test_get_all_spendings_interactor(mocker):
    mock_spend = mocker.MagicMock()

    mock_spend_repo = mocker.patch("app.repositories.SpendRepository")
    mock_spend_repo.list.return_value = [mock_spend]

    interactor = interactors.GetAllSpendingsInteractor(
        spend_repo=mock_spend_repo
    )

    existing_spendings = interactor.execute()

    mock_spend_repo.list.assert_called_once()

    assert existing_spendings == [mock_spend]

def test_get_spend_by_id_interactor(mocker):
    mock_spend = mocker.MagicMock(id="123")

    mock_spend_repo = mocker.patch("app.repositories.SpendRepository")
    mock_spend_repo.get.return_value = mock_spend

    interactor = interactors.GetSpendByIdInteractor(
        spend_repo=mock_spend_repo
    )

    existing_spend = interactor.execute(spend_id=mock_spend.id)

    mock_spend_repo.get.assert_called_once_with(mock_spend.id)

    assert existing_spend == mock_spend

def test_get_spend_by_id_interactor_when_spend_not_found(mocker):
    mock_spend = mocker.MagicMock(id="123")

    mock_spend_repo = mocker.patch("app.repositories.SpendRepository")
    mock_spend_repo.get.return_value = None

    interactor = interactors.GetSpendByIdInteractor(
        spend_repo=mock_spend_repo
    )

    with pytest.raises(interactors.LogicException):
        interactor.execute(spend_id=mock_spend.id)

    mock_spend_repo.get.assert_called_once_with(mock_spend.id)