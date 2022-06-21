from typing import NoReturn

from fastapi import Request
from fastapi.responses import JSONResponse


class DomainException(Exception):
    def __init__(self, code: str, message: str, status_code: int) -> NoReturn:
        self.code = code
        self.message = message
        self.status_code = status_code

        super().__init__(message)


class UserEmailAlreadyUsedError(DomainException):
    def __init__(self) -> NoReturn:
        super().__init__(
            'UserEmailAlreadyUsed', 
            'Podany adres email jest już w użyciu', 
            400
        )


class BadAuthenticationCredentialsError(DomainException):
    def __init__(self) -> NoReturn:
        super().__init__(
            'BadAuthenticationCredentials', 
            'Podany adres email lub hasło są nieprawidłowe', 
            400
        )


class UserNotFoundError(DomainException):
    def __init__(self) -> NoReturn:
        self.code = 'UserNotFoundError'
        self.message = 'Użytkownik o podanych właściwościach nie istnieje'
        self.status_code = 400

        super().__init__(self.code, self.message, self.status_code)


async def domain_exception_handler(request: Request, exception: DomainException) -> JSONResponse:
    return JSONResponse(
        status_code=exception.status_code,
        content={
            'code': exception.code,
            'message': exception.message
        }
    )
