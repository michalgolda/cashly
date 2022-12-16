from abc import ABC, abstractmethod
from io import BytesIO
from typing import Generic, List, TypeVar

import pandas as pd
from app.entities import Expense

TExportEntity = TypeVar("TExportEntity")


class Exporter(Generic[TExportEntity], ABC):
    @abstractmethod
    def export(self, entities: List[TExportEntity]) -> BytesIO:
        pass


class ExpensesExporter(Exporter[Expense]):
    def export(self, entities: List[Expense]) -> BytesIO:
        data = list(
            map(
                lambda expense: {
                    "kwota": expense.amount,
                    "kategoria": expense.category.name if expense.category else None,
                    "data realizacji": expense.realised_date,
                },
                entities,
            )
        )
        file_buffer = BytesIO()
        data_frame = pd.DataFrame(data)
        data_frame.to_csv(file_buffer, index_label="lp")
        file_buffer.seek(0)

        return file_buffer
