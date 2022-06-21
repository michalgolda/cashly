from uuid import UUID
from abc import ABC, abstractmethod
from typing import Generic, TypeVar, Union, NoReturn

TEntity = TypeVar('TEntity')

class Repository(Generic[TEntity], ABC):
    @abstractmethod
    def get_by_id(self, id: UUID) -> Union[TEntity, None]: ...

    @abstractmethod
    def add(self, entity: TEntity) -> TEntity: ...

    @abstractmethod
    def save(self, entity: TEntity) -> TEntity: ...

    @abstractmethod
    def delete(self, entity: TEntity) -> NoReturn: ...