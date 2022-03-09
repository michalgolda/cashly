from io import BytesIO
from datetime import datetime
from abc import ABC, abstractmethod
from typing import List, TypedDict, Union

import numpy as np
import pandas as pd


SUPPORTED_FILE_CONTENT_TYPES = [
    'text/csv',
    'text/plain',
    'application/vnd.ms-excel'
]


class ParsedExpense(TypedDict):
    amount: float
    category_name: Union[str, None]
    realised_date: datetime


class AbstractExpensesImporter(ABC):
    @abstractmethod
    def make(self, uploaded_file: BytesIO) -> List[ParsedExpense]:
        pass


class ExpensesImporter(AbstractExpensesImporter):
    def make(self, uploaded_file: BytesIO) -> List[ParsedExpense]:
        parsed_expenses = []

        data_frame = pd.read_csv(uploaded_file)
        data_frame = data_frame.replace({ np.nan: None })
        
        row_count = len(data_frame.axes[0])

        data_frame = data_frame.to_dict(orient='list')

        for row in range(row_count):
            amount = data_frame['kwota'][row]
            category = data_frame['kategoria'][row]
            realised_date = datetime.strptime(data_frame['data realizacji'][row], '%Y-%m-%d')
            
            parsed_expenses.append(
                ParsedExpense(
                    amount=amount,
                    category_name=category,
                    realised_date=realised_date
                )
            )

        return parsed_expenses