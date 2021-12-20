from typing import NoReturn, Callable, Dict, Type

from fastapi import Request, FastAPI
from fastapi.responses import JSONResponse


MAPPED_EXCEPTIONS: Dict[Type[Exception], Callable] = {}


def exception_handlers_loader(app: FastAPI) -> NoReturn:
    for exc_class, exc_handler in MAPPED_EXCEPTIONS.items():
        app.add_exception_handler(exc_class, exc_handler)


def map_exception_handler(exc_class: Type[Exception]) -> Callable:
    def wrapper(exc_handler: Callable) -> Callable:
        MAPPED_EXCEPTIONS[exc_class] = exc_handler

        return exc_handler
    return wrapper


class DomainException(Exception):
    def __init__(self, code: str, message: str, status_code: int):
        self.code = code
        self.message = message
        self.status_code = status_code


@map_exception_handler(DomainException)
async def domain_exception_handler(request: Request, exc: DomainException) -> JSONResponse:
    exc_code = exc.code
    exc_message = exc.message
    exc_status_code = exc.status_code

    return JSONResponse(
        status_code=exc_status_code,
        content={
            'code': exc_code,
            'message': exc_message
        }
    )
