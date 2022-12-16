import PropTypes from 'prop-types';

import { List } from '@/components';

import CategoryListEmptyInformer from './CategoryListEmptyInformer';
import CategoryListItem from './CategoryListItem/CategoryListItem';
import CategoryListSkeleton from './CategoryListSkeleton';

function CategoryList({ data, isEmpty, isLoading }) {
  return !isLoading && isEmpty ? (
    <CategoryListEmptyInformer />
  ) : (
    <List>
      {isLoading ? (
        <CategoryListSkeleton />
      ) : (
        <>
          {data.map((item, index) => {
            return <CategoryListItem key={index} {...item} />;
          })}
        </>
      )}
    </List>
  );
}

CategoryList.propTypes = {
  data: PropTypes.array,
  isEmpty: PropTypes.bool,
  isLoading: PropTypes.bool,
};

CategoryList.defaultProps = {
  isEmpty: true,
  isLoading: false,
};

export default CategoryList;
