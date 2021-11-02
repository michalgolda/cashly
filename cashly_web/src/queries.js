import axios from "axios";
import config from "./config";

export async function getAllCategories() {
    const response = await axios.get(`${config.apiURL}/spend-categories/`);
    const data = await response.data;

    return data;
}

export async function getAllExpenses() {
    const response = await axios.get(`${config.apiURL}/spendings/`);
    const data = await response.data;

    return data;
}