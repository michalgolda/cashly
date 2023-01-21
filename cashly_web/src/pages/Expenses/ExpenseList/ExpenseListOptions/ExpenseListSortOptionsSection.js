import { Input } from '@/components';

import ExpenseListOptionsSection from './ExpenseListOptionsSection/ExpenseListOptionsSection';

export default function ExpenseListSortOptionsSection({
  sortParams,
  handleClearParams,
  handleChangeParam,
}) {
  return (
    <ExpenseListOptionsSection onClearParams={handleClearParams}>
      <Input
        as="select"
        labelText="Wartość"
        name="amount"
        onChange={handleChangeParam}
        value={sortParams['amount']}
        fullWidth
      >
        <option value="">Brak</option>
        <option value="ascending">Rosnąco</option>
        <option value="descending">Malejąco</option>
      </Input>
      <Input
        as="select"
        labelText="Data realizacji"
        name="realised_date"
        onChange={handleChangeParam}
        value={sortParams['realised_date']}
        fullWidth
      >
        <option value="">Brak</option>
        <option value="ascending">Rosnąco</option>
        <option value="descending">Malejąco</option>
      </Input>
    </ExpenseListOptionsSection>
  );
}
