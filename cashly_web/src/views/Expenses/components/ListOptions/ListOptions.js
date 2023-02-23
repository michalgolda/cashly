import { useQuery } from 'react-query'

import { expenseCategoryService } from '@/api/services'

import FilterOptionsSection from './FilterOptionsSection'
import { StyledContainer } from './ListOptions.styled'
import OptionsSectionSwitch from './OptionsSectionSwitch/OptionsSectionSwitch'
import SortOptionsSection from './SortOptionsSection'
import * as actions from './actions'
import { useListOptions } from './hooks/useListOptions'

export default function ExpenseListOptions() {
    const [state, dispatch] = useListOptions()

    const getAllExpenseCategories = useQuery(
        'categories',
        expenseCategoryService.getAllExpenseCategories
    )

    const handleChangeParam = (e, action, callback) => {
        const paramName = e.target.name
        const paramValue = e.target.value

        dispatch({ type: action, payload: { paramName, paramValue } })
        callback()
    }

    return (
        <StyledContainer>
            <OptionsSectionSwitch
                showFilterOptionsSection={state.showFilterOptionsSection}
                showSortOptionsSection={state.showSortOptionsSection}
                toggleFilterOptionsSection={() =>
                    dispatch({
                        type: actions.TOGGLE_FILTER_OPTIONS_SECTION,
                    })
                }
                toggleSortOptionsSection={() =>
                    dispatch({
                        type: actions.TOGGLE_SORT_OPTIONS_SECTION,
                    })
                }
            />
            {state.showFilterOptionsSection && (
                <FilterOptionsSection
                    filterParams={state.filterParams}
                    handleClearParams={() => {
                        dispatch({
                            type: actions.CLEAR_FILTER_PARAMS,
                        })
                        dispatch({
                            type: actions.APPLY_FILTER_OPTIONS,
                        })
                    }}
                    handleChangeParam={(e) =>
                        handleChangeParam(e, actions.SET_FILTER_PARAMS, () =>
                            dispatch({
                                type: actions.APPLY_FILTER_OPTIONS,
                            })
                        )
                    }
                    categories={getAllExpenseCategories.data}
                />
            )}
            {state.showSortOptionsSection && (
                <SortOptionsSection
                    sortParams={state.sortParams}
                    handleClearParams={() => {
                        dispatch({
                            type: actions.CLEAR_SORT_PARAMS,
                        })
                        dispatch({
                            type: actions.APPLY_SORT_OPTIONS,
                        })
                    }}
                    handleChangeParam={(e) =>
                        handleChangeParam(e, actions.SET_SORT_PARAMS, () =>
                            dispatch({
                                type: actions.APPLY_SORT_OPTIONS,
                            })
                        )
                    }
                />
            )}
        </StyledContainer>
    )
}
