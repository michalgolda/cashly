from app.database import session
from app.repositories import SQLAlchemyExpenseRepository, SQLAlchemyExpenseCategoryRepository


def get_expense_repo():
    repo = SQLAlchemyExpenseRepository(session)

    return repo

@lru_cache()
def get_database() -> Database:
    settings: Settings = get_settings()

    db = Database(settings.DATABASE_URL)
    db.create_database()
    
    return db