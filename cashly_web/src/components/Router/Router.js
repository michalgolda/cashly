import PropTypes from "prop-types";
import { BrowserRouter, Route } from "react-router-dom";

function Router({ routes }) {
    return (
        <BrowserRouter>
            {routes.map(({ path, exact, component }, index) => (
                <Route 
                    key={index}
                    path={path} 
                    exact={exact}
                    component={component} 
                />
            ))}
        </BrowserRouter>
    );
}

Router.propTypes = { routes: PropTypes.array.isRequired };

export default Router;