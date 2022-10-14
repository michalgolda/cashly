from abc import ABC, abstractmethod


class Message(ABC):
  @abstractmethod
  def send() -> None: ...

  @abstractmethod
  def set_recipment(self, recipment: str) -> None: ...

  @abstractmethod
  def set_payload(self, payload: dict) -> None: ...


class EmailMessage(Message):
  def set_recipment(self, recipment: str) -> None:
    print(f'Recipment: {recipment}')

  def set_payload(self, payload: dict) -> None:
    print(f'Payload: {str(payload)}')

  def send(self) -> None:
    print('Email message has been sent.')

