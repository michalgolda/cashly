from dataclasses import dataclass
from datetime import date
from enum import Enum
from itertools import groupby
from typing import Callable, List, TypedDict, Union

import pandas as pd
from app.entities import Expense


class AggregationUnits(Enum):
    DAY = "D"
    WEEK = "W"
    MONTH = "M"
    YEAR = "Y"


class AggregationDataFrame(TypedDict):
    key: str
    value: float


@dataclass(frozen=True)
class DefaultAggregatorParams:
    start_date: date
    end_date: date
    unit: AggregationUnits


class GeneralExpensesAggregator:
    def __init__(self, params: DefaultAggregatorParams):
        self._params = params

    @staticmethod
    def default_comparator(data_frame_key: str, group_key: str) -> bool:
        return data_frame_key in group_key

    @staticmethod
    def week_comparator(data_frame_key: str, group_key: str) -> bool:
        frame_start_date, frame_end_date = tuple(
            map(
                lambda date_str: date.fromisoformat(date_str), data_frame_key.split("/")
            )
        )
        group_date = date.fromisoformat(group_key)
        if frame_start_date <= group_date <= frame_end_date:
            return True

        return False

    @staticmethod
    def grouper_key(expense: Expense) -> str:
        return str(expense.realised_date)

    def prepare_data_frames(self) -> List[AggregationDataFrame]:
        period_index = pd.period_range(
            start=self._params.start_date,
            end=self._params.end_date,
            freq=self._params.unit.value,
        )
        return [{"key": str(period), "value": 0} for period in period_index]

    def get_comparator(self) -> Callable:
        mapped_comparators = {
            AggregationUnits.DAY: self.default_comparator,
            AggregationUnits.WEEK: self.week_comparator,
            AggregationUnits.MONTH: self.default_comparator,
            AggregationUnits.YEAR: self.default_comparator,
        }

        return mapped_comparators[self._params.unit]

    def aggregate(self, expenses: List[Expense]) -> List[AggregationDataFrame]:
        data_frames = self.prepare_data_frames()

        for group_key, group_items in groupby(expenses, self.grouper_key):
            for data_frame_index, data_frame in enumerate(data_frames):
                data_frame_key = data_frame.get("key")
                data_frame_value = data_frame.get("value")

                comparator_func = self.get_comparator()
                if comparator_func(data_frame_key, group_key):
                    for item in list(group_items):
                        data_frame_value += item.amount

                    data_frames[data_frame_index].update(value=data_frame_value)

        return data_frames


class CategoryAggregatorMixin:
    @staticmethod
    def grouper_key(expense: Expense) -> Union[str, None]:
        return getattr(expense.category, "name", None)

    @staticmethod
    def find_data_frame_index_by_key(
        data_frames: List[AggregationDataFrame], key: str
    ) -> int:
        for data_frame_index, data_frame in enumerate(data_frames):
            data_frame_key = data_frame.get("key")
            if data_frame_key == key:
                return data_frame_index

        return -1

    @staticmethod
    def calculate_total_amount(expenses: List[Expense]) -> float:
        return sum(list(map(lambda expense: expense.amount, expenses)))


class ExpensesByCategoryAggregator(CategoryAggregatorMixin):
    def aggregate(self, expenses: List[Expense]) -> List[AggregationDataFrame]:
        data_frames = []

        for group_key, group_items in groupby(expenses, self.grouper_key):
            total_amount = self.calculate_total_amount(list(group_items))
            data_frame_index = self.find_data_frame_index_by_key(data_frames, group_key)

            if data_frame_index != -1:
                data_frames[data_frame_index]["value"] += total_amount
            else:
                new_data_frame = {"key": group_key, "value": total_amount}
                data_frames.append(new_data_frame)

        return data_frames


class TotalAmountOfExpensesAggregator(CategoryAggregatorMixin):
    def aggregate(self, expenses: List[Expense]) -> AggregationDataFrame:
        total_amount = self.calculate_total_amount(expenses)
        data_frame = {"key": "total_amount", "value": total_amount}
        return data_frame


class CountExpensesByCategoryAggregator(CategoryAggregatorMixin):
    def aggregate(self, expenses: List[Expense]) -> List[AggregationDataFrame]:
        data_frames = []

        for group_key, group_items in groupby(expenses, self.grouper_key):
            group_items_count = len(list(group_items))
            data_frame_index = self.find_data_frame_index_by_key(data_frames, group_key)

            if data_frame_index != -1:
                data_frames[data_frame_index]["value"] += group_items_count
            else:
                new_data_frame = {"key": group_key, "value": group_items_count}
                data_frames.append(new_data_frame)

        return data_frames
