from pathlib import Path
from pydantic import BaseSettings


class Settings(BaseSettings):
    SECRET_KEY: str = ''
    DATABASE_URL: str = 'sqlite:///' + str(Path(__file__).parent / 'database.sqlite')

    JWT_TOKEN_ALGORITHM: str = 'HS256'
    ACCESS_TOKEN_EXPIRATION: int = 8600

    MAIL_USERNAME: str = ''
    MAIL_PASSWORD: str = ''
    MAIL_FROM: str = ''
    MAIL_PORT: int = 587
    MAIL_SERVER: str = ''
    MAIL_STARTTLS: bool = True
    MAIL_SSL_TTLS: bool = False
    MAIL_USE_CREDENTIALS: bool = True
    MAIL_VALIDATE_CERTS: bool = True
    MAIL_TEMPLATES_PATH: str = str(Path(__file__).parent / 'templates')

settings = Settings()