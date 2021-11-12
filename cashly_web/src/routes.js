import { Redirect } from "react-router";

import { Expenses, Categories, NotFound } from "./pages";


const routes = [
    {
        path: "/",
        exact: true,
        component: () => <Redirect to="/expenses" />
    },
    {
        exact: true,
        path: "/expenses",
        component: Expenses
    },
    {
        exact: true,
        path: "/categories",
        component: Categories
    },
    {
        path: "*",
        component: NotFound
    }
];

export default routes;