from enum import Enum
from datetime import date
from itertools import groupby
from dataclasses import dataclass
from typing import TypedDict, List, Callable

import pandas as pd

from app.entities import Expense


class AggregationUnits(Enum):
    DAY = 'D'
    WEEK = 'W'
    MONTH = 'M'
    YEAR = 'Y'


class DefaultDataShape(TypedDict):
    key: str
    value: float


@dataclass(frozen=True)
class GeneralExpensesAggregatorOptions:
    start_date: date
    end_date: date
    unit: AggregationUnits


class GeneralExpensesAggregator:
    def __init__(self, options: GeneralExpensesAggregatorOptions):
        self._options = options

    def generate_data_shapes(self) -> List[DefaultDataShape]:
        period_index = pd.period_range(
            start=self._options.start_date,
            end=self._options.end_date,
            freq=self._options.unit.value
        )
        data_shapes = [{'key': str(period), 'value': 0} for period in period_index]

        return data_shapes

    @staticmethod
    def default_comparator(data_shape_key: str, group_key: str) -> bool:
        return data_shape_key in group_key

    @staticmethod
    def week_comparator(data_shape_key: str, group_key: str) -> bool:
        data_shape_key_start, data_shape_key_end = data_shape_key.split('/')

        data_shape_key_start_date = date.fromisoformat(data_shape_key_start)
        data_shape_key_end_date = date.fromisoformat(data_shape_key_end)
        group_key_date = date.fromisoformat(group_key)
        if data_shape_key_start_date <= group_key_date <= data_shape_key_end_date:
            return True

        return False

    def get_comparator(self) -> Callable:
        mapped_comparators = {
            AggregationUnits.DAY: self.default_comparator,
            AggregationUnits.WEEK: self.week_comparator,
            AggregationUnits.MONTH: self.default_comparator,
            AggregationUnits.YEAR: self.default_comparator
        }

        return mapped_comparators[self._options.unit]

    def aggregate(self, expenses: List[Expense]) -> List[DefaultDataShape]:
        data_shapes = self.generate_data_shapes()

        for group_key, group_items in groupby(expenses, lambda expense: str(expense.realised_date)):
            for data_shape_index, data_shape in enumerate(data_shapes):
                data_shape_key = data_shape.get('key')
                data_shape_value = data_shape.get('value')

                comparator_func = self.get_comparator()
                if comparator_func(data_shape_key, group_key):
                    for item in list(group_items):
                        data_shape_value += item.amount

                    data_shapes[data_shape_index].update(value=data_shape_value)

        return data_shapes


@dataclass(frozen=True)
class ExpensesByCategoryAggregatorOptions:
    start_date: date
    end_date: date


class ExpensesByCategoryAggregator:
    def __init__(self, options: ExpensesByCategoryAggregatorOptions):
        self._options = options

    def aggregate(self, expenses: List[Expense]) -> List[DefaultDataShape]:
        data_shapes = []

        for group_key, group_items in groupby(expenses, lambda expense: expense.category.name if expense.category else None):
            search_data_shape_index = None

            for data_shape_index in range(len(data_shapes)):
                data_shape = data_shapes[data_shape_index]
                data_shape_key = data_shape.get('key')

                if data_shape_key == group_key:
                    search_data_shape_index = data_shape_index

                    break

            total_amount = 0
            for item in list(group_items):
                total_amount += item.amount

            if search_data_shape_index:
                data_shapes[search_data_shape_index]['value'] += total_amount
            else:
                data_shapes.append({
                    'key': group_key,
                    'value': total_amount
                })

        return data_shapes


class TotalAmountOfExpensesAggregator:
    def aggregate(self, expenses: List[Expense]) -> DefaultDataShape:
        total_amount = 0
        for expense in expenses:
            total_amount += expense.amount

        data_shape = {'key': 'total_amount', 'value': total_amount}

        return data_shape


class CountExpensesByCategoryAggregator:
    def aggregate(self, expenses: List[Expense]) -> List[DefaultDataShape]:
        data_shapes = []

        for group_key, group_items in groupby(expenses, lambda expense: expense.category.name if expense.category else None):
            search_data_shape_index = None

            for data_shape_index in range(len(data_shapes)):
                data_shape = data_shapes[data_shape_index]
                data_shape_key = data_shape.get('key')

                if data_shape_key == group_key:
                    search_data_shape_index = data_shape_index

                    break

            if search_data_shape_index:
                data_shapes[search_data_shape_index]['value'] += len(list(group_items))
            else:
                data_shapes.append({
                    'key': group_key,
                    'value': len(list(group_items))
                })

        return data_shapes