from dataclasses import dataclass
from uuid import UUID

from app.entities import User
from app.exceptions import UserNotFoundError
from app.repositories import UserRepository
from app.usecases import UseCase


@dataclass(frozen=True)
class GetUserByIdUseCaseInput:
    user_id: UUID


@dataclass(frozen=True)
class GetUserByIdUseCaseOutput:
    user: User


class GetUserByIdUseCase(UseCase[GetUserByIdUseCaseInput, GetUserByIdUseCaseOutput]):
    def __init__(self, user_repo: UserRepository) -> None:
        self._user_repo = user_repo

    def execute(self, input: GetUserByIdUseCaseInput) -> GetUserByIdUseCaseOutput:
        exisitng_user = self._user_repo.get_by_id(input.user_id)
        if not exisitng_user:
            raise UserNotFoundError()
        return GetUserByIdUseCaseOutput(exisitng_user)
