import { Input } from '@/components';

import ExpenseListOptionsSection from './ExpenseListOptionsSection/ExpenseListOptionsSection';

export default function ExpenseListFilterOptionsSection({
  filterParams,
  handleClearParams,
  handleChangeParam,
}) {
  return (
    <ExpenseListOptionsSection onClearParams={handleClearParams}>
      <Input
        as="select"
        labelText="Kategoria"
        name="category"
        onChange={handleChangeParam}
        value={filterParams['category']}
      >
        <option value="">Bez kategorii</option>
        <option value="all">Wszystkie</option>
        <option value="Jedzenie">Jedzenie</option>
      </Input>
      <Input
        labelText="Data realizacji"
        name="realised_date"
        type="date"
        onChange={handleChangeParam}
        value={filterParams['realised_date']}
      />
    </ExpenseListOptionsSection>
  );
}
