from fastapi import APIRouter, Depends

from app.dependencies import get_current_user
from app.entities.user import User
from app.schemas.user import UserOut

user_router = APIRouter()


@user_router.get("/users/me", status_code=200, response_model=UserOut)
def get_current_user(current_user: User = Depends(get_current_user)):
    return current_user
