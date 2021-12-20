import { Redirect } from "react-router";

import { Expenses, Categories, NotFound, Analytics } from "./pages";


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
        exact: true,
        path: "/analytics",
        component: Analytics
    },
    {
        path: "*",
        component: NotFound
    }
];

export default routes;