import axios from "axios";
import config from "./config";


export async function getAllExpenseCategories() {
    const requestURL = `${config.apiURL}/expense-categories/`;
    const response = await axios.get(requestURL);
    const data = await response.data;

    return data;
}

export async function getAllExpenses() {
    const requestURL = `${config.apiURL}/expenses/`;
    const response = await axios.get(requestURL);
    const data = await response.data;

    return data;
}