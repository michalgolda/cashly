from pydantic import BaseSettings


class Settings(BaseSettings):
    DATABASE_URL: str = 'sqlite:///database.sqlite'
    SECRET_KEY: str = 'secret key'
    
    ACCESS_TOKEN_ALGORITHM: str = 'HS256'
    ACCESS_TOKEN_EXPIRATION: int = 1800

settings = Settings()