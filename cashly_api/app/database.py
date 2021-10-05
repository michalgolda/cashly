import typing
from contextlib import contextmanager

from sqlalchemy import orm, create_engine
from sqlalchemy.ext.declarative import declarative_base


Base = declarative_base()

class Database:
    def __init__(self, db_url: str):
        self._engine = create_engine(db_url)
        self._session_factory = orm.scoped_session(
            orm.sessionmaker(
                autoflush=False,
                autocommit=False,
                bind=self._engine
            )
        )

    def create_database(self) -> typing.NoReturn:
        Base.metadata.create_all(self._engine)

    @contextmanager
    def session_factory(self) -> typing.Generator[
        orm.Session,
        typing.NoReturn,
        typing.NoReturn
    ]:
        session = self._session_factory()

        try:
            yield session
        except:
            session.rollback()
            raise
        finally:
            session.close()