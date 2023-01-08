from fastapi import APIRouter, Depends

from app.dependencies import (
    get_current_user,
    get_message_client,
    get_security_manager,
    get_user_repo,
)
from app.entities.user import User
from app.messages import MessageClient
from app.repositories import UserRepository
from app.schemas.user import (
    SendEmailVerificationRequestPayload,
    UserOut,
    VerifyEmailPayload,
)
from app.security import SecurityManager
from app.usecases.user import (
    SendEmailVerificationRequestUseCase,
    SendEmailVerificationRequestUseCaseInput,
    VerifyEmailUseCase,
    VerifyEmailUseCaseInput,
)

user_router = APIRouter()


@user_router.get("/users/me", status_code=200, response_model=UserOut)
def response_current_user(current_user: User = Depends(get_current_user)):
    return current_user


@user_router.post("/users/verify/email", status_code=200)
def verify_email(
    payload: VerifyEmailPayload,
    user_repo: UserRepository = Depends(get_user_repo),
    security_manager: SecurityManager = Depends(get_security_manager),
    message_client: MessageClient = Depends(get_message_client),
):
    usecase_input = VerifyEmailUseCaseInput(
        email_verification_token=payload.email_verification_token
    )
    usecase = VerifyEmailUseCase(user_repo, security_manager, message_client)
    usecase.execute(usecase_input)


@user_router.post("/users/verify/email/request", status_code=200)
def send_email_verification_request(
    payload: SendEmailVerificationRequestPayload,
    user_repo: UserRepository = Depends(get_user_repo),
    security_manager: SecurityManager = Depends(get_security_manager),
    message_client: MessageClient = Depends(get_message_client),
):
    usecase_input = SendEmailVerificationRequestUseCaseInput(email=payload.email)
    usecase = SendEmailVerificationRequestUseCase(
        user_repo, security_manager, message_client
    )
    usecase.execute(usecase_input)
