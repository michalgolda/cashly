import PropTypes from 'prop-types';

import { Header } from '@/components';

import ExpensePageHeaderActions from './ExpensePageHeaderActions';

function ExpensePageHeader({ showActions }) {
  return (
    <Header
      title="Wydatki"
      description={`
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Fusce dui nulla, facilisis eu imperdiet non, rhoncus quis nibh. 
                Praesent rutrum viverra iaculis. 
                Phasellus commodo orci vitae venenatis consequat.
            `}
    >
      {showActions && <ExpensePageHeaderActions />}
    </Header>
  );
}

ExpensePageHeader.propTypes = { showActions: PropTypes.bool };
ExpensePageHeader.defaultProps = { showActions: true };

export default ExpensePageHeader;
