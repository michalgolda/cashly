import { useQuery } from 'react-query';

import { expenseCategoryAPI } from '@/api';

import ExpenseListFilterOptionsSection from './ExpenseListFilterOptionsSection';
import * as S from './ExpenseListOptions.styled';
import * as expenseListOptionsActions from './ExpenseListOptionsActions';
import ExpenseListOptionsSectionSwitch from './ExpenseListOptionsSectionSwitch/ExpenseListOptionsSectionSwitch';
import ExpenseListSortOptionsSection from './ExpenseListSortOptionsSection';
import { useExpenseListOptions } from './useExpenseListOptions';

export default function ExpenseListOptions() {
  const [state, dispatch] = useExpenseListOptions();

  const getAllExpenseCategories = useQuery(
    'categories',
    expenseCategoryAPI.getAllExpenseCategories,
  );

  const handleChangeParam = (e, action, callback) => {
    const paramName = e.target.name;
    const paramValue = e.target.value;

    dispatch({ type: action, payload: { paramName, paramValue } });
    callback();
  };

  return (
    <S.Container>
      <ExpenseListOptionsSectionSwitch
        showFilterOptionsSection={state.showFilterOptionsSection}
        showSortOptionsSection={state.showSortOptionsSection}
        toggleFilterOptionsSection={() =>
          dispatch({
            type: expenseListOptionsActions.TOGGLE_FILTER_OPTIONS_SECTION,
          })
        }
        toggleSortOptionsSection={() =>
          dispatch({
            type: expenseListOptionsActions.TOGGLE_SORT_OPTIONS_SECTION,
          })
        }
      />
      {state.showFilterOptionsSection && (
        <ExpenseListFilterOptionsSection
          filterParams={state.filterParams}
          handleClearParams={() => {
            dispatch({ type: expenseListOptionsActions.CLEAR_FILTER_PARAMS });
            dispatch({ type: expenseListOptionsActions.APPLY_FILTER_OPTIONS });
          }}
          handleChangeParam={(e) =>
            handleChangeParam(
              e,
              expenseListOptionsActions.SET_FILTER_PARAMS,
              () =>
                dispatch({
                  type: expenseListOptionsActions.APPLY_FILTER_OPTIONS,
                }),
            )
          }
          categories={getAllExpenseCategories.data}
        />
      )}
      {state.showSortOptionsSection && (
        <ExpenseListSortOptionsSection
          sortParams={state.sortParams}
          handleClearParams={() => {
            dispatch({ type: expenseListOptionsActions.CLEAR_SORT_PARAMS });
            dispatch({ type: expenseListOptionsActions.APPLY_SORT_OPTIONS });
          }}
          handleChangeParam={(e) =>
            handleChangeParam(
              e,
              expenseListOptionsActions.SET_SORT_PARAMS,
              () =>
                dispatch({
                  type: expenseListOptionsActions.APPLY_SORT_OPTIONS,
                }),
            )
          }
        />
      )}
    </S.Container>
  );
}
