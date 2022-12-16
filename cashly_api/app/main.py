from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import metadata, run_mappers
from app.endpoints import (
    analytics_router,
    authentication_router,
    expense_category_router,
    expense_router,
    user_router,
)
from app.exceptions import DomainException, domain_exception_handler


def create_app() -> FastAPI:
    app = FastAPI()

    app.include_router(expense_router)
    app.include_router(analytics_router)
    app.include_router(expense_category_router)
    app.include_router(user_router)
    app.include_router(authentication_router)

    app.add_exception_handler(DomainException, domain_exception_handler)

    app.add_middleware(
        CORSMiddleware,
        allow_methods=["*"],
        allow_headers=["*"],
        allow_credentials=True,
        allow_origins=["http://localhost:3000"],
    )

    app.add_event_handler("startup", run_mappers)
    app.add_event_handler("startup", metadata.create_all)

    return app
