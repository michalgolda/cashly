import PropTypes from 'prop-types';

import { List } from '@/components';

import ExpenseListEmptyInformer from './ExpenseListEmptyInformer/ExpenseListEmptyInformer';
import ExpenseListItem from './ExpenseListItem/ExpenseListItem';
import ExpenseListOptions from './ExpenseListOptions/ExpenseListOptions';
import ExpenseListSkeleton from './ExpenseListSkeleton';

function ExpenseList({ data, isEmpty, isLoading }) {
  if (!isLoading && isEmpty) return <ExpenseListEmptyInformer />;

  return (
    <List>
      {isLoading && <ExpenseListSkeleton />}
      {!isLoading && (
        <>
          {data.map((item, index) => {
            return (
              <ExpenseListItem
                key={index}
                id={item.id}
                amount={item.amount}
                category={item.category}
                realisedDate={item.realised_date}
              />
            );
          })}
        </>
      )}
    </List>
  );
}

ExpenseList.propTypes = {
  data: PropTypes.array,
  isEmpty: PropTypes.bool,
  isLoading: PropTypes.bool,
};

ExpenseList.defaultProps = {
  isEmpty: true,
  isLoading: false,
};

export default ExpenseList;
