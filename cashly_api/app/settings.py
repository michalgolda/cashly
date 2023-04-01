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
        {"name": "jedzenie", "color": "#ff9900"},
        {"name": "rachunki", "color": "#00cc99"},
        {"name": "rozrywka", "color": "#ff3333"},
        {"name": "transport", "color": "#6699ff"},
        {"name": "ubrania", "color": "#9933cc"},
        {"name": "kosmetyki", "color": "#ff99cc"},
        {"name": "elektronika", "color": "#ffcc00"},
        {"name": "meble", "color": "#666699"},
        {"name": "artykuły biurowe", "color": "#009933"},
        {"name": "książki", "color": "#663300"},
        {"name": "muzyka", "color": "#cc99ff"},
        {"name": "sport", "color": "#00ccff"},
        {"name": "zdrowie", "color": "#cc3300"},
        {"name": "edukacja", "color": "#660066"},
        {"name": "opłaty", "color": "#ccccff"},
        {"name": "podróże", "color": "#3399ff"},
        {"name": "usługi finansowe", "color": "#ff6666"},
        {"name": "napoje", "color": "#33cc33"},
        {"name": "alkohol", "color": "#990000"},
        {"name": "obuwie", "color": "#9966ff"},
        {"name": "biżuteria", "color": "#ffcc99"},
        {"name": "akcesoria do samochodu", "color": "#9999cc"},
        {"name": "remont", "color": "#ff33cc"},
        {"name": "telewizja", "color": "#cc6600"},
        {"name": "internet", "color": "#00cc66"},
        {"name": "ubezpieczenia", "color": "#663399"},
        {"name": "prezenty", "color": "#ffcc33"},
        {"name": "dzieci", "color": "#ff6600"},
        {"name": "zwierzęta", "color": "#ff9933"},
        {"name": "praca", "color": "#33cc99"},
        {"name": "inne", "color": "#666666"},
        {"name": "meble ogrodowe", "color": "#669933"},
        {"name": "artykuły spożywcze", "color": "#ccff33"},
        {"name": "artykuły kosmetyczne", "color": "#ff33ff"},
        {"name": "artykuły higieniczne", "color": "#ccffcc"},
        {"name": "artykuły papiernicze", "color": "#cc00ff"},
    ]


settings = Settings()
