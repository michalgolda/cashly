from functools import lru_cache

from app.settings import Settings
from app.database import Database


@lru_cache()
def get_settings() -> Settings:
    return Settings()

@lru_cache()
def get_database() -> Database:
    settings: Settings = get_settings()

    db = Database(settings.DATABASE_URL)
    db.create_database()
    
    return db