from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.endpoints import router
from app.exceptions import exception_handlers_loader


def create_app() -> FastAPI:
    app = FastAPI()

    app.include_router(router)

    exception_handlers_loader(app)

    app.add_middleware(
        CORSMiddleware,
        allow_methods=["*"],
        allow_headers=["*"],
        allow_credentials=True,
        allow_origins=["http://localhost:3000"]
    )

    return app