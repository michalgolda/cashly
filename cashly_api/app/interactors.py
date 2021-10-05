import typing
from abc import ABC, abstractmethod
from app import schemas, models, repositories


class Interactor(ABC):

    @abstractmethod
    def __init__():
        raise NotImplementedError

    @abstractmethod
    def execute():
        raise NotImplementedError


class LogicException(Exception):
    def __init__(self, message: str, status_code = 419):
        self.message = message
        self.status_code = status_code


class SpendInteractor(Interactor):
    def __init__(self, spend_repo: repositories.SpendRepository):
        self._spend_repo = spend_repo

class CreateSpendInteractor(SpendInteractor):
    def __init__(self, spend_category_repo: repositories.SpendCategoryRepository, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self._spend_category_repo = spend_category_repo

    def execute(self, spend: schemas.SpendCreate) -> models.Spend:
        existing_spend_category = None

        if spend.spend_category_id:
            existing_spend_category = self._spend_category_repo.get(
                spend_category_id=spend.spend_category_id
            )

            if not existing_spend_category:
                raise LogicException(
                    ("You have tried create spend but " 
                    "spend category id is not found")
                )

        created_spend = self._spend_repo.add(
            spend,
            spend_category=existing_spend_category
        )

        return created_spend

class DeleteSpendInteractor(SpendInteractor):
    def execute(self, spend_id: str) -> schemas.SpendOut:
        existing_spend = self._spend_repo.get(spend_id)

        if not existing_spend:
            raise LogicException("You have tried delete spend but is not found")

        deleted_spend = self._spend_repo.delete(existing_spend)

        return deleted_spend

class GetAllSpendingsInteractor(SpendInteractor):
    def execute(self) -> typing.List[schemas.SpendOut]:
        spendings = self._spend_repo.list()

        return spendings

class GetSpendByIdInteractor(SpendInteractor):
    def execute(self, spend_id: str) -> schemas.SpendOut:
        existing_spend = self._spend_repo.get(spend_id)

        if not existing_spend:
            raise LogicException("You have tried get spend but is not found")

        return existing_spend

class SpendCategoryInteractor(Interactor):
    def __init__(self, spend_category_repo: repositories.SpendCategoryRepository):
        self._spend_category_repo = spend_category_repo

class CreateSpendCategoryInteractor(SpendCategoryInteractor):
    def execute(self, spend_category: schemas.SpendCategoryCreate) -> models.SpendCategory:
        # TODO: Implement check whether spend category name is already used

        created_spend_category = self._spend_category_repo.add(spend_category)

        return created_spend_category

class DeleteSpendCategoryInteractor(SpendCategoryInteractor):
    def execute(self, spend_category_id: str) -> models.SpendCategory:
        existing_spend_category = self._spend_category_repo.get(spend_category_id)

        if not existing_spend_category:
            raise LogicException(
                ("You have tried delete " 
                "spend category but is not found")
            )

        deleted_spend_category = self._spend_category_repo.delete(existing_spend_category)

        return deleted_spend_category

class GetAllSpendCategoriesInteractor(SpendCategoryInteractor):
    def execute(self) -> typing.List[models.SpendCategory]:
        exisitng_spend_categories = self._spend_category_repo.list()

        return exisitng_spend_categories

class GetSpendCategoryByIdInteractor(SpendCategoryInteractor):
    def execute(self, spend_category_id: str) -> models.SpendCategory:
        existing_spend_category = self._spend_category_repo.get(spend_category_id)

        if not existing_spend_category:
            raise LogicException(
                ("You have tried get spend " 
                "category but is not found")
            )

        return existing_spend_category