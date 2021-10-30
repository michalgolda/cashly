import { Redirect } from "react-router";
import { Spendings, SpendCategories } from "./pages"

const routes = [
    {
        path: "/",
        exact: true,
        component: () => <Redirect to="/spendings" />
    },
    {
        exact: true,
        path: "/spendings",
        component: Spendings
    },
    {
        exact: true,
        path: "/categories",
        component: SpendCategories
    }
];

export default routes;