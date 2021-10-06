from contextlib import contextmanager
from app.database import Database


class TestDatabase:
    def __init__(self):
        self.database = Database("sqlite:///./test.db")
        self.database.create_database()

    def get_database(self) -> Database:
        return self.database

    def __enter__(self):
        return self.database

    def __exit__(self, exc_type, exc_value, exc_tb):
        pass
