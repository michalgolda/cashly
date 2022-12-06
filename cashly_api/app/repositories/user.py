from uuid import UUID
from abc import abstractmethod
from typing import NoReturn, Union, List, Optional

from sqlalchemy.orm.session import Session

from app.entities import User
from app.repositories import Repository


class UserRepository(Repository[User]):
    @abstractmethod
    def get_by_email(self, email: str) -> Union[User, None]: ...


class MemoryUserRepository(UserRepository):
    def __init__(self, users: Optional[List[User]] = None) -> NoReturn:
        self._users = users or []

    def get_by_id(self, id: UUID) -> Union[User, None]:
        existing_user = None
        for user in self._users:
            if user.id == id:
                existing_user = user
        return existing_user

    def get_by_email(self, email: str) -> Union[User, None]:
        existing_user = None
        for user in self._users:
            if user.email == email:
                existing_user = user
        return existing_user

    def add(self, entity: User) -> User:
        self._users.append(entity)
        return entity

    def save(self, entity: User) -> User:
        duplicate_of_users = self._users
        for i, user in enumerate(self._users):
            if user.id == entity.id:
                duplicate_of_users[i] = user
        self._users = duplicate_of_users
        return entity

    def delete(self, entity: User) -> NoReturn:
        self._users = [user for user in self._users if user.id != entity.id]


class SQLAlchemyUserRepository(UserRepository):
    def __init__(self, session: Session) -> NoReturn:
        self._session = session

    def get_by_id(self, id: UUID) -> Union[User, None]:
        return self._session.query(User).filter_by(id=id).first()

    def get_by_email(self, email: str) -> Union[User, None]:
        return self._session.query(User).filter_by(email=email).first()

    def add(self, entity: User) -> User:
        self._session.add(entity)
        self._session.commit()

        return entity

    def save(self, entity: User) -> User:
        self._session.commit()
        self._session.refresh(entity)

        return entity

    def delete(self, entity: User) -> NoReturn:
        self._session.delete(entity)
        self._session.commit()