import axios from "axios";

import config from "./config";
import { buildURL } from "./utilities/url";


export async function getAllExpenseCategories() {
    const requestURL = `${config.apiURL}/expense_categories/`;
    const response = await axios.get(requestURL);
    const data = await response.data;

    return data;
}

export async function getAllExpenses() {
    const requestURL = `${config.apiURL}/expenses/`;
    const response = await axios.get(requestURL);
    const data = await response.data;

export async function getAnalyticsData(analyticsName, queryParams) {
    const baseURLString = `${config.apiURL}/analytics/${analyticsName}/`;
    const requestURL = buildURL(baseURLString, queryParams);
    const response = await axios.get(requestURL);
    return await response.data;
}