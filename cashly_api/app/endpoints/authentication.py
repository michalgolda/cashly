from fastapi import APIRouter, Depends, Response
from app.messages import EmailMessage

from app.security import SecurityManager
from app.repositories import UserRepository
from app.schemas.authentication import AuthenticationCredentials, ForgotPasswordPayload, ResetPasswordPayload
from app.usecases.authentication import (
  RegisterUseCase,
  RegisterUseCaseInput,
  LoginUseCase,
  LoginUseCaseInput,
  ResetPasswordUseCase,
  ResetPasswordUseCaseInput,
  SendResetPasswordLinkInput,
  SendResetPasswordLinkUseCase  
)
from app.dependencies import get_user_repo, get_security_manager


authentication_router = APIRouter()

@authentication_router.post('/auth/register', status_code=201)
def register(
  credentials: AuthenticationCredentials,
  user_repo: UserRepository = Depends(get_user_repo), 
  security_manager: SecurityManager = Depends(get_security_manager)
):
  register_usecase_input = RegisterUseCaseInput(
    email=credentials.email, 
    password=credentials.password
  )
  register_usecase = RegisterUseCase(user_repo, security_manager)
  register_usecase.execute(register_usecase_input)

@authentication_router.post('/auth/login', status_code=200)
def login(
  response: Response,
  credentials: AuthenticationCredentials,
  user_repo: UserRepository = Depends(get_user_repo),
  security_manager: SecurityManager = Depends(get_security_manager)
):
  login_usecase_input = LoginUseCaseInput(
    email=credentials.email, 
    password=credentials.password
  )
  login_usecase = LoginUseCase(user_repo, security_manager)
  login_usecase_output = login_usecase.execute(login_usecase_input)

  response.set_cookie('access_token', login_usecase_output.access_token, httponly=True, samesite='Strict')

  return dict(access_token=login_usecase_output.access_token)

@authentication_router.post('/auth/forgotpassword', status_code=200)
def forgot_password(
  forgot_password_payload: ForgotPasswordPayload,
  user_repo: UserRepository = Depends(get_user_repo), 
  security_manager: SecurityManager = Depends(get_security_manager)
):
  usecase_input = SendResetPasswordLinkInput(forgot_password_payload.email)

  message = EmailMessage()

  usecase = SendResetPasswordLinkUseCase(
    user_repo,
    message,
    security_manager
  )
  usecase.execute(usecase_input)

@authentication_router.post('/auth/resetpassword', status_code=200)
def reset_password(reset_password_payload: ResetPasswordPayload, user_repo: UserRepository = Depends(get_user_repo), security_manager: SecurityManager = Depends(get_security_manager)):
  usecase_input = ResetPasswordUseCaseInput(
    password=reset_password_payload.password,
    token=reset_password_payload.token
  )

  usecase = ResetPasswordUseCase(
    user_repo,
    security_manager
  )
  usecase.execute(usecase_input)
