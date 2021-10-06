import typing

from abc import ABC, abstractmethod

from app import schemas, models
from app.database import Database


class Repository(ABC):
    def __init__(self, db: Database):
        self._db = db

    @abstractmethod
    def add():
        raise NotImplementedError

    @abstractmethod
    def get():
        raise NotImplementedError

    @abstractmethod
    def get_one_by():
        raise NotImplementedError

    @abstractmethod
    def list():
        raise NotImplementedError

    @abstractmethod
    def delete():
        raise NotImplementedError


class SpendRepository(Repository):
    def add(self, spend: schemas.SpendCreate, spend_category: models.SpendCategory) -> models.Spend:
        with self._db.session_factory() as session:
            new_spend = models.Spend(
                spend_category,
                amount=spend.amount
            )

            session.add(new_spend)
            session.commit()
            session.refresh(new_spend)

            return new_spend

    def get(self, spend_id: str) -> typing.Union[models.Spend, None]:
        with self._db.session_factory() as session:
            spend = session.query(models.Spend).get(spend_id)

            return spend

    def get_one_by(self, *args, **kwargs) -> typing.Union[models.Spend, None]:
        with self._db.session_factory() as session:
            spend = session.query(models.Spend) \
                           .filter_by(*args, **kwargs).first()

            return spend

    def list(self) -> typing.List[models.Spend]:
        with self._db.session_factory() as session:
            spendings = session.query(models.Spend).all()

            return spendings

    def delete(self, spend: models.Spend) -> models.Spend:
        with self._db.session_factory() as session:
            session.delete(spend)
            session.commit()

            return spend


class SpendCategoryRepository(Repository):
    def add(self, spend_category: schemas.SpendCategoryCreate) -> models.SpendCategory:
        with self._db.session_factory() as session:
            new_spend_category = models.SpendCategory(
                name=spend_category.name,
                color=spend_category.color
            )
            
            session.add(new_spend_category)
            session.commit()
            session.refresh(new_spend_category)

            return new_spend_category

    def get(self, spend_category_id: str) -> typing.Union[models.SpendCategory, None]:
        with self._db.session_factory() as session:
            spend_category = session.query(models.SpendCategory) \
                                    .get(spend_category_id)

            return spend_category

    def get_one_by(self, *args, **kwargs) -> typing.Union[models.SpendCategory, None]:
        with self._db.session_factory() as session:
            spend_category = session.query(models.SpendCategory) \
                                    .filter_by(*args, **kwargs).first()

            return spend_category

    def list(self) -> typing.List[models.SpendCategory]:
        with self._db.session_factory() as session:
            spend_categories = session.query(models.SpendCategory).all()

            return spend_categories

    def delete(self, spend_category: models.SpendCategory) -> models.SpendCategory:
        with self._db.session_factory() as session:
            session.delete(spend_category)
            session.commit()

        return spend_category
                    