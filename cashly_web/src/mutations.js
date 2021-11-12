import axios from "axios";
import config from "./config";


export async function createExpenseCategory(data) {
	const requestURL = `${config.apiURL}/spend-categories/`;
	const response = await axios.post(requestURL, data);

	return response;
}

export async function deleteExpenseCategory(expenseCategoryId) {
	const requestURL = `${config.apiURL}/spend-categories/${expenseCategoryId}/`;
	const response = await axios.delete(requestURL);

	return response;
}

export async function createExpense(data) {
	const requestURL = `${config.apiURL}/spendings/`;
	const response = await axios.post(requestURL, data);

	return response;
}

export async function deleteExpense(expenseId) {
	const requestURL = `${config.apiURL}/spendings/${expenseId}/`;
	const response = await axios.delete(requestURL);

	return response;
}