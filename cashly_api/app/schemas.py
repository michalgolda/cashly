from datetime import datetime
from pydantic import BaseModel


class SpendCategory(BaseModel):
    name: str
    color: str = "#000"

    class Config:
        orm_mode = True

class SpendCategoryCreate(SpendCategory):
    pass

class SpendCategoryOut(SpendCategory):
    id: str
    created_at: datetime
    updated_at: datetime = None


class Spend(BaseModel):
    amount: int 

    class Config:
        orm_mode = True

class SpendCreate(Spend):
    spend_category_id: str = None

class SpendOut(Spend):
    id: str
    spend_category: SpendCategoryOut = None
    created_at: datetime
    updated_at: datetime = None
