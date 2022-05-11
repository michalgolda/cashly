from uuid import UUID
from typing import NoReturn, Union
from abc import ABC, abstractmethod

from sqlalchemy.orm.session import Session

from app.entities import User


class AbstractUserRepository(ABC):
    @abstractmethod
    def get_by_id(self, user_id: UUID) -> Union[None, User]:
        pass

    @abstractmethod
    def add(self, user: User) -> User:
        pass

    @abstractmethod
    def save(self, user: User) -> User:
        pass

    @abstractmethod
    def delete(self, user: User) -> NoReturn:
        pass


class SQLAlchemyUserRepository(AbstractUserRepository):
    def __init__(self, session: Session):
        self._session = session

    def get_by_id(self, user_id: UUID) -> Union[None, User]:
        user = self._session.query(User) \
            .filter_by(id=user_id) \
            .first()

        return user

    def add(self, user: User) -> User:
        self._session.add(user)
        self._session.commit()

        return user

    def save(self, user: User) -> User:
        self._session.commit()
        self._session.refresh()

        return user

    def delete(self, user: User) -> NoReturn:
        self._session.delete(user)
        self._session.commit()