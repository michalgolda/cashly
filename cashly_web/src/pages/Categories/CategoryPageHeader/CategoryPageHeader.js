import PropTypes from "prop-types";

import { Header } from "../../../components";
import AddCategoryButton from "../AddCategoryButton/AddCategoryButton";


function CategoryPageHeader({ showRightElement }) {
    const rightElement = showRightElement ? <AddCategoryButton /> : null;
    
    return (
        <Header 
            title="Kategorie"
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

CategoryPageHeader.propTypes = { showRightElement: PropTypes.bool };

CategoryPageHeader.defaultProps = { showRightElement: true };

export default CategoryPageHeader;