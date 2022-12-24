import PropTypes from 'prop-types';

import { Header } from '@/components';

import CategoryPageHeaderActions from './CategoryPageHeaderActions';

function CategoryPageHeader({ showActions }) {
  return (
    <Header
      title="Kategorie"
      description={`
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Fusce dui nulla, facilisis eu imperdiet non, rhoncus quis nibh. 
                Praesent rutrum viverra iaculis. 
                Phasellus commodo orci vitae venenatis consequat.
            `}
    >
      {showActions && <CategoryPageHeaderActions />}
    </Header>
  );
}

CategoryPageHeader.propTypes = { showActions: PropTypes.bool };
CategoryPageHeader.defaultProps = { showActions: true };

export default CategoryPageHeader;
