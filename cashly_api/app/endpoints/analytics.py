from datetime import date
from dataclasses import dataclass

from fastapi import APIRouter, Depends, Query

from app.entities import User
from app.aggregator import (
    AggregationUnits,
    DefaultAggregatorParams,
    GeneralExpensesAggregator,
    ExpensesByCategoryAggregator,
    TotalAmountOfExpensesAggregator,
    CountExpensesByCategoryAggregator
)
from app.repositories import ExpenseRepository
from app.repositories.expense import ExpenseRepository
from app.dependencies import get_expense_repo, get_current_user


analytics_router = APIRouter()


@dataclass
class AnalyticsDateParams:
    start_date: date = Query(...)
    end_date: date = Query(...)


@analytics_router.get('/analytics/general_expenses/')
def get_general_expenses(
    unit: AggregationUnits = Query(...),
    current_user: User = Depends(get_current_user),
    date_params: AnalyticsDateParams = Depends(),
    expense_repo: ExpenseRepository = Depends(get_expense_repo)
):
    expenses = expense_repo.get_by_date_range_and_user_id(
        start_date=date_params.start_date,
        end_date=date_params.end_date,
        user_id=current_user.id
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
    current_user: User = Depends(get_current_user),
    date_params: AnalyticsDateParams = Depends(),
    expense_repo: ExpenseRepository = Depends(get_expense_repo)
):
    expenses = expense_repo.get_by_date_range_and_user_id(
        start_date=date_params.start_date,
        end_date=date_params.end_date,
        user_id=current_user.id
    )

    aggregator = ExpensesByCategoryAggregator()
    aggregated_data = aggregator.aggregate(expenses)

    return aggregated_data


@analytics_router.get('/analytics/total_amount_of_expenses/')
def get_total_amount_of_expenses(
    current_user: User = Depends(get_current_user),
    date_params: AnalyticsDateParams = Depends(),
    expense_repo: ExpenseRepository = Depends(get_expense_repo)
):
    expenses = expense_repo.get_by_date_range_and_user_id(
        start_date=date_params.start_date,
        end_date=date_params.end_date,
        user_id=current_user.id
    )

    aggregator = TotalAmountOfExpensesAggregator()
    aggregated_data = aggregator.aggregate(expenses)

    return aggregated_data


@analytics_router.get('/analytics/count_expenses_by_category/')
def get_count_expenses_by_category(
    current_user: User = Depends(get_current_user),
    date_params: AnalyticsDateParams = Depends(),
    expense_repo: ExpenseRepository = Depends(get_expense_repo)
):
    expenses = expense_repo.get_by_date_range_and_user_id(
        start_date=date_params.start_date,
        end_date=date_params.end_date,
        user_id=current_user.id
    )

    aggregator = CountExpensesByCategoryAggregator()
    aggregated_data = aggregator.aggregate(expenses)

    return aggregated_data
    