import asyncio
from abc import ABC, abstractmethod
from typing import List, NoReturn

import fastapi_mail
import jinja2

from app.settings import settings


class Message(ABC):
    @property
    @abstractmethod
    def recipients(self) -> List[str]:
        ...

    @property
    @abstractmethod
    def template_name(self) -> str:
        ...

    @property
    @abstractmethod
    def payload(self) -> dict:
        ...

    @abstractmethod
    def load_template(self):
        ...


class EmailMessage(Message):
    def __init__(
        self, title: str, recipients: List[str], template_name: str, payload: dict = {}
    ):
        self._title = title
        self._recipients = recipients
        self._template_name = template_name
        self._payload = payload

    @property
    def title(self) -> str:
        return self._title

    @property
    def recipients(self) -> List[str]:
        return self._recipients

    @property
    def template_name(self) -> str:
        return self._template_name

    @property
    def payload(self) -> dict:
        return self._payload

    def load_template(self) -> str:
        templateLoader = jinja2.FileSystemLoader(settings.MAIL_TEMPLATES_PATH)
        templateEnvironment = jinja2.Environment(loader=templateLoader)
        template = templateEnvironment.get_template(self.template_name)
        return template.render(self.payload)

    def __str__(self) -> str:
        return f"""
            EmailMessage(
                title={self.title}, 
                recipients={self.recipients}, 
                template_name={self.template_name}, 
                payload={self.payload}
            )
        """


class MessageClient(ABC):
    @abstractmethod
    def send(self, message: Message) -> NoReturn:
        ...


class EmailMessageClient(MessageClient):
    def __init__(self, fm: fastapi_mail.FastMail):
        self._fm = fm

    @staticmethod
    def _convert_to_fm_message_schema(
        message: EmailMessage,
    ) -> fastapi_mail.MessageSchema:
        return fastapi_mail.MessageSchema(
            subject=message.title,
            recipients=message.recipients,
            body=message.load_template(),
            subtype=fastapi_mail.MessageType.html,
        )

    def send(self, message: EmailMessage) -> NoReturn:
        fm_message = self._convert_to_fm_message_schema(message)
        asyncio.run(self._fm.send_message(fm_message))


class MemoryMessageClient(MessageClient):
    output = []

    def send(self, message: EmailMessage) -> NoReturn:
        self.output.append(message)
