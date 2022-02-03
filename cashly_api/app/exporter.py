import pandas as pd
from io import BytesIO
from typing import List
from abc import ABC, abstractmethod

from app.entities import Expense


class AbstractExpensesExporter(ABC):
    @abstractmethod
    def export(self, expenses: List[Expense]) -> BytesIO:
        pass


class ExpensesExporter(AbstractExpensesExporter):
    def export(self, expenses: List[Expense]) -> BytesIO:
        data = list(
            map(
                lambda expense: {
                    'kwota': expense.amount,
                    'kategoria': expense.category.name if expense.category else None,
                    'data realizacji': expense.realised_date
                },
                expenses
            )
        )
        exporter_buffer = BytesIO()
        data_frame = pd.DataFrame(data)
        data_frame.to_csv(exporter_buffer)
        exporter_buffer.seek(0)

        return exporter_buffer
