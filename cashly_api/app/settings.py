from pathlib import Path
from typing import List

from pydantic import BaseSettings


class Settings(BaseSettings):
    SECRET_KEY: str = ""
    DATABASE_URL: str = "sqlite:///" + str(
        Path(__file__).parents[1] / "database.sqlite"
    )

    JWT_TOKEN_ALGORITHM: str = "HS256"

    ACCESS_TOKEN_EXPIRATION: int = 8600

    RESET_PASSWORD_TOKEN_EXPIRATION: int = 7200

    EMAIL_VERIFICATION_TOKEN_EXPIRATION: int = 7200

    MAIL_USERNAME: str = ""
    MAIL_PASSWORD: str = ""
    MAIL_FROM: str = ""
    MAIL_PORT: int = 587
    MAIL_SERVER: str = ""
    MAIL_STARTTLS: bool = True
    MAIL_SSL_TLS: bool = True
    MAIL_USE_CREDENTIALS: bool = True
    MAIL_VALIDATE_CERTS: bool = True
    MAIL_TEMPLATES_PATH: str = str(Path(__file__).parent / "templates")

    DEFAULT_EXPENSE_CATEGORIES: List[dict] = [
        {"name": "Jedzenie", "color": "#dfff40"},
        {"name": "Paliwo", "color": "#7dff45"},
        {"name": "Internet", "color": "#00eaff"},
        {"name": "Prąd", "color": "#6f00ff"},
        {"name": "Gaz", "color": "#ff6a00"},
        {"name": "Woda", "color": "#003cff"},
    ]


settings = Settings()
