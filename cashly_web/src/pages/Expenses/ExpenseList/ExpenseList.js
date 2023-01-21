import PropTypes from 'prop-types';

import * as S from './ExpenseList.styled';
import ExpenseListEmptyInformer from './ExpenseListEmptyInformer/ExpenseListEmptyInformer';
import ExpenseListItem from './ExpenseListItem/ExpenseListItem';
import ExpenseListSkeleton from './ExpenseListSkeleton';

function ExpenseList({ data, isEmpty, isLoading }) {
  if (!isLoading && isEmpty) return <ExpenseListEmptyInformer />;

  return (
    <S.List>
      {isLoading && <ExpenseListSkeleton />}
      {!isLoading && (
        <>
          {data.length === 0 ? (
            <S.Text>Brak wydatków spełniających wybrane kryteria</S.Text>
          ) : (
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
        </>
      )}
    </S.List>
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
