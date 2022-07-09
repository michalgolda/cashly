from uuid import UUID, uuid4

from sqlalchemy.sql import func as sql_func
from sqlalchemy.types import TypeDecorator, CHAR
from sqlalchemy.dialects.postgresql import UUID as PostgresUUID
from sqlalchemy.orm import sessionmaker, mapper, relationship, scoped_session
from sqlalchemy import (
    create_engine, MetaData, Table,
    Column, Float, Date, DateTime, ForeignKey, String
)

from app.settings import settings
from app.entities import Expense, ExpenseCategory, User


engine = create_engine(
    settings.DATABASE_URL,
    connect_args={'check_same_thread': False}
)
session_factory = scoped_session(
    sessionmaker(
        bind=engine,
        autoflush=False,
        autocommit=False
    )
)
session = session_factory()
metadata = MetaData(bind=engine)


class SQLAlchemyUUID(TypeDecorator):
    """Platform-independent GUID type.
    Uses PostgreSQL's UUID type, otherwise uses
    CHAR(32), storing as stringified hex values.
    """
    impl = CHAR

    def load_dialect_impl(self, dialect):
        if dialect.name == 'postgresql':
            return dialect.type_descriptor(PostgresUUID())
        else:
            return dialect.type_descriptor(CHAR(32))

    def process_bind_param(self, value, dialect):
        if value is None:
            return value
        elif dialect.name == 'postgresql':
            return str(value)
        else:
            if not isinstance(value, UUID):
                return "%.32x" % UUID(value).int
            else:
                return "%.32x" % value.int

    def process_result_value(self, value, dialect):
        if value is None:
            return value
        else:
            if not isinstance(value, UUID):
                value = UUID(value)
            return value


expense = Table(
    'expense',
    metadata,
    Column('id', SQLAlchemyUUID(), index=True, primary_key=True, default=lambda: str(uuid4())),
    Column('amount', Float),
    Column('realised_date', Date),
    Column('category_id', ForeignKey('expense_category.id')),
    Column('created_at', DateTime(timezone=True), server_default=sql_func.now()),
    Column('updated_at', DateTime(timezone=True), onupdate=sql_func.now())
)

expense_category = Table(
    'expense_category',
    metadata,
    Column('id', SQLAlchemyUUID(), index=True, primary_key=True, default=lambda: str(uuid4())),
    Column('user_id', ForeignKey('user.id')),
    Column('name', String(20)),
    Column('color', String(7)),
    Column('created_at', DateTime(timezone=True), server_default=sql_func.now()),
    Column('updated_at', DateTime(timezone=True), onupdate=sql_func.now())
)

user = Table(
    'user',
    metadata,
    Column('id', SQLAlchemyUUID(), index=True, primary_key=True, default=lambda: str(uuid4())),
    Column('email', String(255), index=True),
    Column('password', String(255)),
    Column('created_at', DateTime(timezone=True), server_default=sql_func.now()),
    Column('updated_at', DateTime(timezone=True), onupdate=sql_func.now())
)

def run_mappers():
    mapper(User, user)
    mapper(
        Expense,
        expense,
        properties={'category': relationship(ExpenseCategory, backref='expense_category')}
    )
    mapper(
        ExpenseCategory,
        expense_category,
        properties={'user': relationship(User, backref='user')}
    )