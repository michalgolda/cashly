import PropTypes from "prop-types";

import { Header } from "../../../components";
import RightElements from "./RightElements/RightElements";


function CategoryPageHeader({ showRightElement }) {
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

CategoryPageHeader.propTypes = { showRightElement: PropTypes.bool };

CategoryPageHeader.defaultProps = { showRightElement: true };

export default CategoryPageHeader;