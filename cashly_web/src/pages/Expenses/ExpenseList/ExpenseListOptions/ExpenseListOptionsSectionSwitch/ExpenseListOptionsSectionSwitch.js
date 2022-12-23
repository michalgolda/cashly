import * as S from './ExpenseListOptionsSectionSwitch.styled';
import ExpenseListOptionsSectionSwitchButton from './ExpenseListOptionsSectionSwitchButton';

export default function ExpenseListOptionsSectionSwitch({
  showFilterOptionsSection,
  showSortOptionsSection,
  toggleFilterOptionsSection,
  toggleSortOptionsSection,
}) {
  return (
    <S.Container
      showOptionsSection={showFilterOptionsSection || showSortOptionsSection}
    >
      <ExpenseListOptionsSectionSwitchButton
        optionsSectionName="Filtrowanie"
        isCurrentOptionsSection={showFilterOptionsSection}
        onClick={() => toggleFilterOptionsSection()}
      />
      <ExpenseListOptionsSectionSwitchButton
        optionsSectionName="Sortowanie"
        isCurrentOptionsSection={showSortOptionsSection}
        onClick={() => toggleSortOptionsSection()}
      />
    </S.Container>
  );
}
