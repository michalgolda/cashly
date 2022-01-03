from datetime import date
from dataclasses import dataclass

from fastapi import APIRouter, Depends, Query

from app.aggregator import (
    AggregationUnits,
    DefaultAggregatorParams,
    GeneralExpensesAggregator,
    ExpensesByCategoryAggregator,
    TotalAmountOfExpensesAggregator,
    CountExpensesByCategoryAggregator
)
from app.dependencies import get_expense_repo
from app.repositories import AbstractExpenseRepository


analytics_router = APIRouter()


@dataclass
class AnalyticsDateParams:
    start_date: date = Query(...)
    end_date: date = Query(...)


@analytics_router.get('/analytics/general_expenses/')
def get_general_expenses(
    unit: AggregationUnits = Query(...),
    date_params: AnalyticsDateParams = Depends(),
    expense_repo: AbstractExpenseRepository = Depends(get_expense_repo)
):
    expenses = expense_repo.get_by_date_range(
        start_date=date_params.start_date,
        end_date=date_params.end_date
    )

    options = DefaultAggregatorParams(
        start_date=date_params.start_date,
        end_date=date_params.end_date,
        unit=unit
    )
    aggregator = GeneralExpensesAggregator(options)
    aggregated_data = aggregator.aggregate(expenses)

    return aggregated_data


@analytics_router.get('/analytics/expenses_by_category/')
def get_expenses_by_category(
    date_params: AnalyticsDateParams = Depends(),
    expense_repo: AbstractExpenseRepository = Depends(get_expense_repo)
):
    expenses = expense_repo.get_by_date_range(
        start_date=date_params.start_date,
        end_date=date_params.end_date
    )

    aggregator = ExpensesByCategoryAggregator()
    aggregated_data = aggregator.aggregate(expenses)

    return aggregated_data


@analytics_router.get('/analytics/total_amount_of_expenses/')
def get_total_amount_of_expenses(
    date_params: AnalyticsDateParams = Depends(),
    expense_repo: AbstractExpenseRepository = Depends(get_expense_repo)
):
    expenses = expense_repo.get_by_date_range(
        start_date=date_params.start_date,
        end_date=date_params.end_date
    )

    aggregator = TotalAmountOfExpensesAggregator()
    aggregated_data = aggregator.aggregate(expenses)

    return aggregated_data


@analytics_router.get('/analytics/count_expenses_by_category/')
def get_count_expenses_by_category(
    date_params: AnalyticsDateParams = Depends(),
    expense_repo: AbstractExpenseRepository = Depends(get_expense_repo)
):
    expenses = expense_repo.get_by_date_range(
        start_date=date_params.start_date,
        end_date=date_params.end_date
    )

    aggregator = CountExpensesByCategoryAggregator()
    aggregated_data = aggregator.aggregate(expenses)

    return aggregated_data


