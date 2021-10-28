import { Redirect } from "react-router";
import { Spendings, SpendCategories } from "./pages"

const routes = [
    {
        path: "/",
        component: () => <Redirect to="/spendings" />
    },
    {
        path: "/spendings",
        component: Spendings
    },
    {
        path: "/categories",
        component: SpendCategories
    }
];

export default routes;