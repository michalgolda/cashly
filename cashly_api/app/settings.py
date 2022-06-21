from pydantic import BaseSettings


class Settings(BaseSettings):
    DATABASE_URL: str = 'sqlite:///database.sqlite'
    SECRET_KEY: str = 'secret key'

settings = Settings()