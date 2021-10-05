from fastapi import FastAPI

from app.endpoints import router
from app.exceptions import exception_handlers_loader


def create_app() -> FastAPI:
    app = FastAPI()

    app.include_router(router)

    exception_handlers_loader(app)

    return app