from app.dependencies import get_message_client, get_security_manager, get_user_repo
from app.messages import EmailMessage, MessageClient
from app.repositories import UserRepository
from app.schemas.authentication import (
    AuthenticationCredentials,
    PasswordRecoveryProceedPayload,
    PasswordRecoveryRequestPayload,
)
from app.security import SecurityManager
from app.usecases.authentication import (
    LoginUseCase,
    LoginUseCaseInput,
    RegisterUseCase,
    RegisterUseCaseInput,
    ResetPasswordUseCase,
    ResetPasswordUseCaseInput,
    SendResetPasswordLinkUseCase,
    SendResetPasswordLinkUseCaseInput,
)
from fastapi import APIRouter, Depends, Response

authentication_router = APIRouter()


@authentication_router.post("/auth/register", status_code=201)
def register(
    credentials: AuthenticationCredentials,
    user_repo: UserRepository = Depends(get_user_repo),
    security_manager: SecurityManager = Depends(get_security_manager),
):
    usecase_input = RegisterUseCaseInput(
        email=credentials.email, password=credentials.password
    )
    usecase = RegisterUseCase(user_repo, security_manager)
    usecase.execute(usecase_input)


@authentication_router.post("/auth/login", status_code=200)
def login(
    response: Response,
    credentials: AuthenticationCredentials,
    user_repo: UserRepository = Depends(get_user_repo),
    security_manager: SecurityManager = Depends(get_security_manager),
):
    usecase_input = LoginUseCaseInput(
        email=credentials.email, password=credentials.password
    )
    usecase = LoginUseCase(user_repo, security_manager)
    usecase_output = usecase.execute(usecase_input)

    return {"access_token": usecase_output.access_token}


@authentication_router.post("/auth/passwordrecovery", status_code=200)
def password_recovery_request(
    password_recovery_request_payload: PasswordRecoveryRequestPayload,
    user_repo: UserRepository = Depends(get_user_repo),
    security_manager: SecurityManager = Depends(get_security_manager),
    message_client: MessageClient = Depends(get_message_client),
):
    usecase_input = SendResetPasswordLinkUseCaseInput(
        password_recovery_request_payload.email
    )

    usecase = SendResetPasswordLinkUseCase(user_repo, message_client, security_manager)
    usecase.execute(usecase_input)


@authentication_router.put("/auth/passwordrecovery", status_code=200)
def password_recovery_proceed(
    password_recovery_proceed_payload: PasswordRecoveryProceedPayload,
    user_repo: UserRepository = Depends(get_user_repo),
    message_client: MessageClient = Depends(get_message_client),
    security_manager: SecurityManager = Depends(get_security_manager),
):
    usecase_input = ResetPasswordUseCaseInput(
        password=password_recovery_proceed_payload.password,
        reset_password_token=password_recovery_proceed_payload.password_recovery_token,
    )

    usecase = ResetPasswordUseCase(user_repo, message_client, security_manager)
    usecase.execute(usecase_input)
