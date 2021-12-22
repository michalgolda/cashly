from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import run_mappers, metadata
from app.exceptions import exception_handlers_loader
from app.endpoints import expense_category_router, expense_router


def create_app() -> FastAPI:
    app = FastAPI()

    app.include_router(expense_router)
    app.include_router(expense_category_router)

    exception_handlers_loader(app)

    app.add_middleware(
        CORSMiddleware,
        allow_methods=["*"],
        allow_headers=["*"],
        allow_credentials=True,
        allow_origins=["http://localhost:3000"]
    )

    app.add_event_handler('startup', run_mappers)
    app.add_event_handler('startup', metadata.create_all)

    return app