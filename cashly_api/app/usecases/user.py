from uuid import UUID
from dataclasses import dataclass
from abc import ABC, abstractmethod

from app.entities import User
from app.exceptions import DomainException
from app.repositories import AbstractUserRepository

class UserNotFoundError(DomainException):
    def __init__(self, user_id: UUID):
        self.code = 'UserNotFound'
        self.message = f'Nie znaleziono użytkownika o podanym id {str(user_id)}'
        self.status_code = 404

        super().__init__(self.code, self.message, self.status_code)


class UserEmailAlreadyUsedError(DomainException):
    def __init__(self):
        self.code = 'UserEmailAlreadyUsed'
        self.message = f'Użytkownik o podanym adresie email już istnieje'
        self.status_code = 400

        super().__init__(self.code, self.message, self.status_code)


@dataclass(frozen=True)
class GetUserByIdRequest:
    user_id: UUID


@dataclass(frozen=True)
class GetUserByIdResult:
    user: User


class AbstractGetUserByIdUseCase(ABC):
    def __init__(self, user_repo: AbstractUserRepository):
        self._user_repo = user_repo

    @abstractmethod
    def execute(self, request: GetUserByIdRequest) -> GetUserByIdResult:
        pass


class GetUserByIdUseCase(AbstractGetUserByIdUseCase):
    def execute(self, request: GetUserByIdRequest) -> GetUserByIdResult:
        user_id = request.user_id
        user = self._user_repo.get_by_id(user_id)

        if not user:
            raise UserNotFoundError(user_id)

        result = GetUserByIdResult(user)

        return result

@dataclass(frozen=True)
class CreateUserRequest:
    email: str
    password: str

@dataclass(frozen=True)
class CreateUserResponse:
    user: User

class AbstractCreateUserUseCase(ABC):
    def __init__(self, user_repo: AbstractUserRepository):
        self._user_repo = user_repo

    @abstractmethod
    def execute(self, request: CreateUserRequest) -> CreateUserResponse:
        pass


class CreateUserUseCase(AbstractCreateUserUseCase):
    def execute(self, request: CreateUserRequest) -> CreateUserResponse:
        new_user_email = request.email
        new_user_password = request.password

        existing_user = self._user_repo.get_by_email(new_user_email)
        if existing_user: 
            raise UserEmailAlreadyUsedError()      

        new_user = User(
            email=new_user_email, 
            password=new_user_password,
        )
        self._user_repo.add(new_user)

        return CreateUserResponse(new_user)