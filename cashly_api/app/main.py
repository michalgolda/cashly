from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import run_mappers, metadata
    authentication_router,


def create_app() -> FastAPI:
    app = FastAPI()

    app.include_router(authentication_router)

    app.add_exception_handler(DomainException, domain_exception_handler)

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