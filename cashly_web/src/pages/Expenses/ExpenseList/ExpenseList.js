import PropTypes from "prop-types";

import { List } from "../../../components";
import ExpenseListItem from "../ExpenseListItem/ExpenseListItem";
import ExpenseListSkeleton from "../ExpenseListSkeleton/ExpenseListSkeleton";
import ExpenseListEmptyInformer from "../ExpenseListEmptyInformer/ExpenseListEmptyInformer";


function ExpenseList({ data, isEmpty, isLoading }) {
    return !isLoading && isEmpty ? <ExpenseListEmptyInformer /> : (
      <List>
          {isLoading ? <ExpenseListSkeleton /> : (
              <>
                  {data.map((item, index) => {
                      return <ExpenseListItem key={index} {...item} />;
                  })}
              </>
          )}
      </List>
    );
}

ExpenseList.propTypes = {
    data: PropTypes.array,
    isEmpty: PropTypes.bool,
    isLoading: PropTypes.bool
};

ExpenseList.defaultProps = {
    isEmpty: true,
    isLoading: false
};

export default ExpenseList;