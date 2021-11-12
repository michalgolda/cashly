import axios from "axios";
import config from "./config";


export async function createExpenseCategory(data) {
	const requestURL = `${config.apiURL}/spend-categories/`;
	const response = await axios.post(requestURL, data);

	return response;
}

export async function createExpenseCategory(newExpenseCategoryData) {
	const response = await axios.post(
		`${config.apiURL}/spend-categories/`, 
		newExpenseCategoryData
	);

	return response;
}