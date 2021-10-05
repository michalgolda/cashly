from contextlib import contextmanager
from app.database import Database


class TestDatabase:
    database = Database("sqlite:///./test.db")

    def get_database(self) -> Database:
        return self.database

    def __enter__(self):
        return self.database

    def __exit__(self, exc_type, exc_value, exc_tb):
        pass
