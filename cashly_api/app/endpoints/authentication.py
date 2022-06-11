import bcrypt
from fastapi import APIRouter, Depends

from app.schemas import UserCreate
from app.dependencies import get_user_repo
from app.repositories import AbstractUserRepository
from app.authentication import generate_password_hash
from app.usecases import CreateUserRequest, CreateUserUseCase

auth_router = APIRouter()

@auth_router.post('/auth/register', status_code=201)
def create_user(
  user: UserCreate,
  user_repo: AbstractUserRepository = Depends(get_user_repo)
): 
  request = CreateUserRequest(
    email=user.email,
    password=generate_password_hash(user.password)
  ) 
  usecase = CreateUserUseCase(user_repo)
  usecase.execute(request)
  
  return {'msg': 'Successfully created new user'}