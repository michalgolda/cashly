from fastapi import Depends

from app.entities import User
from app.database import session
from app.settings import settings
from app.security import (
    AccessTokenPayload, 
    HTTPAccessToken, 
    SecurityManager, 
    DefaultSecurityManager
)
from app.repositories import (
    SQLAlchemyExpenseRepository, 
    SQLAlchemyExpenseCategoryRepository, 
    UserRepository,
    SQLAlchemyUserRepository
)

def get_expense_repo():
    return SQLAlchemyExpenseRepository(session)

def get_expense_category_repo():
    return SQLAlchemyExpenseCategoryRepository(session)

def get_user_repo() -> UserRepository:
    return SQLAlchemyUserRepository(session)

def get_security_manager() -> SecurityManager:
    return DefaultSecurityManager()

def get_current_user(
    user_repo: UserRepository = Depends(get_user_repo),
    access_token_payload: AccessTokenPayload = Depends(HTTPAccessToken(security_manager=get_security_manager()))
) -> User:
    return user_repo.get_by_id(access_token_payload.sub)
