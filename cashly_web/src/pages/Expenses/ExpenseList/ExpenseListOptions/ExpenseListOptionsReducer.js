import moment from 'moment';

import * as actions from './ExpenseListOptionsActions';
import { useExpenseListOptionsPersist } from './usePersistedExpenseListOptionsState';

export const initialState = {
  expenses: [],
  fetchedExpenes: [],
  showSortOptionsSection: false,
  showFilterOptionsSection: false,
  sortParams: {
    amount: '',
    realised_date: '',
  },
  filterParams: {
    category: 'all',
    realised_date: '',
  },
};

export function expenseListOptionsReducer(state, action) {
  switch (action.type) {
    case actions.FETCH_EXPENSES_SUCCESS:
      return {
        ...state,
        expenses: action.payload,
        fetchedExpenes: action.payload,
      };
    case actions.SET_FILTER_PARAMS:
      state = {
        ...state,
        filterParams: {
          ...state.filterParams,
          [action.payload.paramName]: action.payload.paramValue,
        },
      };

      localStorage.setItem('filterParams', JSON.stringify(state.filterParams));

      return state;
    case actions.CLEAR_FILTER_PARAMS:
      localStorage.removeItem('filterParams');
      return { ...state, filterParams: initialState.filterParams };
    case actions.SET_SORT_PARAMS:
      state = {
        ...state,
        sortParams: {
          ...state.sortParams,
          [action.payload.paramName]: action.payload.paramValue,
        },
      };

      localStorage.setItem('sortParams', JSON.stringify(state.sortParams));

      return state;
    case actions.CLEAR_SORT_PARAMS:
      localStorage.removeItem('sortParams');
      return { ...state, sortParams: initialState.sortParams };
    case actions.TOGGLE_FILTER_OPTIONS_SECTION:
      state = {
        ...state,
        showSortOptionsSection: false,
        showFilterOptionsSection: !state.showFilterOptionsSection,
      };

      localStorage.setItem(
        'showSortOptionsSection',
        state.showSortOptionsSection,
      );
      localStorage.setItem(
        'showFilterOptionsSection',
        state.showFilterOptionsSection,
      );

      return state;
    case actions.TOGGLE_SORT_OPTIONS_SECTION:
      state = {
        ...state,
        showSortOptionsSection: !state.showSortOptionsSection,
        showFilterOptionsSection: false,
      };

      localStorage.setItem(
        'showSortOptionsSection',
        state.showSortOptionsSection,
      );
      localStorage.setItem(
        'showFilterOptionsSection',
        state.showFilterOptionsSection,
      );

      return state;
    case actions.APPLY_FILTER_OPTIONS:
      return {
        ...state,
        expenses: state.fetchedExpenes
          .filter((expense) => {
            if (state.filterParams.category === 'all') return true;
            if (state.filterParams.category === '') return !expense.category;
            return expense.category
              ? expense.category.name === state.filterParams.category
              : false;
          })
          .filter((expense) => {
            if (state.filterParams.realised_date === '') return true;
            return expense.realised_date === state.filterParams.realised_date;
          }),
      };
    case actions.APPLY_SORT_OPTIONS:
      return {
        ...state,
        expenses: state.expenses.sort((firstExpense, secondExpense) => {
          if (state.sortParams.amount === 'ascending') {
            if (firstExpense.amount > secondExpense.amount) return 1;
            if (firstExpense.amount < secondExpense.amount) return -1;
            return 0;
          }

          if (state.sortParams.amount === 'descending') {
            if (firstExpense.amount > secondExpense.amount) return -1;
            if (firstExpense.amount < secondExpense.amount) return 1;
            return 0;
          }

          if (state.sortParams.realised_date === 'ascending') {
            const firstExpenseRealisedDate = moment(firstExpense.realised_date);
            const secondExpenseRealisedDate = moment(
              secondExpense.realised_date,
            );

            if (firstExpenseRealisedDate > secondExpenseRealisedDate) return 1;
            if (firstExpenseRealisedDate < secondExpenseRealisedDate) return -1;
            return 0;
          }

          if (state.sortParams.realised_date === 'descending') {
            const firstExpenseRealisedDate = moment(firstExpense.realised_date);
            const secondExpenseRealisedDate = moment(
              secondExpense.realised_date,
            );

            if (firstExpenseRealisedDate > secondExpenseRealisedDate) return -1;
            if (firstExpenseRealisedDate < secondExpenseRealisedDate) return 1;
            return 0;
          }
        }),
      };
    default:
      return state;
  }
}
