from fastapi import APIRouter, Depends, Response

from app.security import SecurityManager
from app.repositories import UserRepository
from app.schemas.authentication import AuthenticationCredentials
from app.usecases.authentication import (
  RegisterUseCase,
  RegisterUseCaseInput,
  LoginUseCase,
  LoginUseCaseInput  
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
