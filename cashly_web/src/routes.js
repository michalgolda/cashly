import { Redirect } from "react-router";
import { NotFound, Spendings, SpendCategories } from "./pages"

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
    },
    {
        path: "*",
        component: NotFound
    }
];

export default routes;