import typing

from fastapi import Request, FastAPI
from fastapi.responses import JSONResponse

from app.interactors import LogicException


MAPPED_EXCEPTIONS: typing.Dict[
    typing.Type[Exception], 
    typing.Callable
] = {}

def exception_handlers_loader(app: FastAPI) -> typing.NoReturn:
    for exc_class, exc_handler in MAPPED_EXCEPTIONS.items():
        app.add_exception_handler(exc_class, exc_handler)

def map_exception_handler(exc_class: typing.Type[Exception]) -> typing.Callable:
    def wrapper(exc_handler: typing.Callable) -> typing.Callable:
        MAPPED_EXCEPTIONS[exc_class] = exc_handler

        return exc_handler
    return wrapper

@map_exception_handler(LogicException)
async def logic_exception_handler(request: Request, exc: LogicException) -> JSONResponse:
    exc_message = exc.message
    exc_status_code = exc.status_code
    
    return JSONResponse(
        status_code=exc_status_code,
        content={'message': exc_message}
    )