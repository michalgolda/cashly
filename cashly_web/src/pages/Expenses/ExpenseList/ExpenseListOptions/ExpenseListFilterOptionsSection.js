import { Input } from '@/components';

import ExpenseListOptionsSection from './ExpenseListOptionsSection/ExpenseListOptionsSection';

export default function ExpenseListFilterOptionsSection({
  filterParams,
  handleClearParams,
  handleChangeParam,
  categories,
}) {
  return (
    <ExpenseListOptionsSection onClearParams={handleClearParams}>
      <Input
        as="select"
        labelText="Kategoria"
        name="category"
        onChange={handleChangeParam}
        value={filterParams['category']}
        fullWidth
      >
        <option value="">Bez kategorii</option>
        <option value="all">Wszystkie</option>
        {categories &&
          categories.map((category) => {
            return (
              <option key={category.id} id={category.id} value={category.name}>
                {category.name}
              </option>
            );
          })}
      </Input>
      <Input
        labelText="Data realizacji"
        name="realised_date"
        type="date"
        onChange={handleChangeParam}
        value={filterParams['realised_date']}
        fullWidth
      />
    </ExpenseListOptionsSection>
  );
}
