from abc import ABC, abstractmethod
from datetime import datetime
from io import BytesIO
from typing import Generic, List, TypedDict, TypeVar, Union

import numpy as np
import pandas as pd

SUPPORTED_FILE_CONTENT_TYPES = ["text/csv", "text/plain", "application/vnd.ms-excel"]

TParsedEntity = TypeVar("TParsedEntity")


class Importer(Generic[TParsedEntity], ABC):
    @abstractmethod
    def make(self, file: BytesIO) -> List[TParsedEntity]:
        pass


class ParsedExpense(TypedDict):
    amount: float
    category_name: Union[str, None]
    realised_date: datetime


class ExpensesImporter(Importer[ParsedExpense]):
    def make(self, file: BytesIO) -> List[ParsedExpense]:
        parsed_expenses = []
        data_frame = pd.read_csv(file)
        data_frame = data_frame.replace({np.nan: None})

        row_count = len(data_frame.axes[0])

        data_frame = data_frame.to_dict(orient="list")

        for row in range(row_count):
            amount = data_frame["kwota"][row]
            category = data_frame["kategoria"][row]
            realised_date = datetime.strptime(
                data_frame["data realizacji"][row], "%Y-%m-%d"
            )

            parsed_expenses.append(
                ParsedExpense(
                    amount=amount, category_name=category, realised_date=realised_date
                )
            )

        return parsed_expenses


class ParsedExpenseCategory(TypedDict):
    name: str
    color: str


class ExpenseCategoryImporter(Importer[ParsedExpenseCategory]):
    def make(self, file: BytesIO) -> List[ParsedExpenseCategory]:
        parsed_expense_categories = []
        data_frame = pd.read_csv(file)

        row_count = len(data_frame.axes[0])
        data_frame = data_frame.to_dict(orient="list")

        for row in range(row_count):
            name = data_frame["nazwa"][row]
            color = data_frame["kolor"][row]

            parsed_expense_categories.append(
                ParsedExpenseCategory(name=name, color=color)
            )
        return parsed_expense_categories
