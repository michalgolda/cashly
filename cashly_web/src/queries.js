import axios from "axios";
import config from "./config";

export async function getAllCategories() {
    const response = await axios.get(`${config.apiURL}/spend-categories/`);
    const data = await response.data;

    return data;
}
