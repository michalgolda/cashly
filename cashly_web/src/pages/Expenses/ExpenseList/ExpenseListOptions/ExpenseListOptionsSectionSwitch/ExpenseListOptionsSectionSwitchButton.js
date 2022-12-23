import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

import { Button } from '@/components';

export default function ExpenseListOptionsSectionSwitchButton({
  optionsSectionName,
  isCurrentOptionsSection,
  ...props
}) {
  return (
    <Button
      variant={isCurrentOptionsSection ? 'primary' : 'primaryOutlined'}
      endIcon={isCurrentOptionsSection ? faCaretDown : faCaretUp}
      {...props}
    >
      {optionsSectionName}
    </Button>
  );
}
