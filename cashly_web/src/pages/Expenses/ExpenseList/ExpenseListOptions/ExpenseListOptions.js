import ExpenseListFilterOptionsSection from './ExpenseListFilterOptionsSection';
import * as S from './ExpenseListOptions.styled';
import ExpenseListOptionsSectionSwitch from './ExpenseListOptionsSectionSwitch/ExpenseListOptionsSectionSwitch';
import ExpenseListSortOptionsSection from './ExpenseListSortOptionsSection';
import { useExpenseListOptions } from './useExpenseListOptions';

export default function ExpenseListOptions() {
  const {
    showFilterOptionsSection,
    showSortOptionsSection,
    toggleFilterOptionsSection,
    toggleSortOptionsSection,
    filterParams,
    setFilterParams,
    sortParams,
    setSortParams,
    clearFilterParams,
    clearSortParams,
  } = useExpenseListOptions();

  const handleChangeParam = (e, setter) => {
    const paramName = e.target.name;
    const paramValue = e.target.value;

    setter((prevParams) => {
      return { ...prevParams, [paramName]: paramValue };
    });
  };

  return (
    <S.Container>
      <ExpenseListOptionsSectionSwitch
        showFilterOptionsSection={showFilterOptionsSection}
        showSortOptionsSection={showSortOptionsSection}
        toggleFilterOptionsSection={toggleFilterOptionsSection}
        toggleSortOptionsSection={toggleSortOptionsSection}
      />
      {showFilterOptionsSection && (
        <ExpenseListFilterOptionsSection
          filterParams={filterParams}
          handleClearParams={() => clearFilterParams()}
          handleChangeParam={(e) => handleChangeParam(e, setFilterParams)}
        />
      )}
      {showSortOptionsSection && (
        <ExpenseListSortOptionsSection
          sortParams={sortParams}
          handleClearParams={() => clearSortParams()}
          handleChangeParam={(e) => handleChangeParam(e, setSortParams)}
        />
      )}
    </S.Container>
  );
}
