import { ActionsContainer } from '@/components/Header/Header.styled';

import DatePeriodSelectInput from '../DatePeriodSelectInput';

export default function AnalyticsPageHeaderActions() {
  return (
    <ActionsContainer>
      <DatePeriodSelectInput />
    </ActionsContainer>
  );
}
