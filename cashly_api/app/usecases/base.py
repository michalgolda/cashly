from abc import ABC, abstractmethod
from typing import Generic, TypeVar, Union, NoReturn

TUseCaseInput = TypeVar('TUseCaseInput')
TUseCaseOutput = TypeVar('TUseCaseOutput')


class UseCase(Generic[TUseCaseInput, TUseCaseOutput], ABC):
  @abstractmethod
  def execute(self, input: TUseCaseInput) -> Union[TUseCaseOutput, NoReturn]: ...