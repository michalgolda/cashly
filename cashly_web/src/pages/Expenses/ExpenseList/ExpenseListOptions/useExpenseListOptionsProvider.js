import { useEffect, useState } from 'react';

const availableOptionSections = {
  FILTER: 'F',
  SORT: 'S',
};

const defaultFilterParams = {
  category: 'all',
  realised_date: '',
};

const defaultSortParams = { amount: '', realised_date: '' };

export const useExpenseListOptionsProvider = () => {
  const [currentOptionsSection, setCurrentOptionsSection] = useState(() =>
    localStorage.getItem('currentExpensesListOptionsSection'),
  );
  const [showFilterOptionsSection, setShowFilterOptionsSection] = useState(
    () => currentOptionsSection === availableOptionSections.FILTER,
  );
  const [showSortOptionsSection, setShowSortOptionsSection] = useState(
    () => currentOptionsSection === availableOptionSections.SORT,
  );

  const changeCurrentOptionsSection = (optionsSection) => {
    setCurrentOptionsSection(optionsSection);
    localStorage.setItem('currentExpensesListOptionsSection', optionsSection);
  };

  useEffect(() => {
    showFilterOptionsSection &&
      changeCurrentOptionsSection(availableOptionSections.FILTER);
    showSortOptionsSection &&
      changeCurrentOptionsSection(availableOptionSections.SORT);
    !showFilterOptionsSection &&
      !showSortOptionsSection &&
      changeCurrentOptionsSection(null);
  }, [showFilterOptionsSection, showSortOptionsSection]);

  const toggleFilterOptionsSection = () => {
    if (showFilterOptionsSection) setShowFilterOptionsSection(false);
    else {
      setShowFilterOptionsSection(true);
      setShowSortOptionsSection(false);
    }
  };

  const toggleSortOptionsSection = () => {
    if (showSortOptionsSection) setShowSortOptionsSection(false);
    else {
      setShowSortOptionsSection(true);
      setShowFilterOptionsSection(false);
    }
  };

  const getParamsFromStorage = (storageKey, defaultValues) => {
    const storagedParams = JSON.parse(localStorage.getItem(storageKey));
    if (!storagedParams) return defaultValues;
    return storagedParams;
  };

  const [filterParams, setFilterParams] = useState(() =>
    getParamsFromStorage('filterParams', defaultFilterParams),
  );

  const [sortParams, setSortParams] = useState(() =>
    getParamsFromStorage('sortParams', defaultSortParams),
  );

  const clearFilterParams = () => setFilterParams(defaultFilterParams);
  const clearSortParams = () => setSortParams(defaultSortParams);

  useEffect(() => {
    localStorage.setItem('filterParams', JSON.stringify(filterParams));
  }, [filterParams]);

  useEffect(() => {
    localStorage.setItem('sortParams', JSON.stringify(sortParams));
  }, [sortParams]);

  return {
    currentOptionsSection,
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
  };
};
