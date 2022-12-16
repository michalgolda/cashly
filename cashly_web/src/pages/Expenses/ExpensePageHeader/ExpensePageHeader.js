import PropTypes from 'prop-types';

import { Header } from '@/components';

import RightElements from './RightElements';

function ExpensePageHeader({ showRightElement }) {
  const rightElement = showRightElement ? <RightElements /> : null;

  return (
    <Header
      title="Wydatki"
      description={`
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Fusce dui nulla, facilisis eu imperdiet non, rhoncus quis nibh. 
                Praesent rutrum viverra iaculis. 
                Phasellus commodo orci vitae venenatis consequat.
            `}
      rightElement={rightElement}
    />
  );
}

ExpensePageHeader.propTypes = { showRightElement: PropTypes.bool };

ExpensePageHeader.defaultProps = { showRightElement: true };

export default ExpensePageHeader;
