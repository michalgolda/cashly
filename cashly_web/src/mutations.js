import axios from "axios";
import config from "./config";


export async function createExpenseCategory(data) {
	const requestURL = `${config.apiURL}/expense_categories/`;
	const response = await axios.post(requestURL, data);

	return response;
}

export async function deleteExpenseCategory(expenseCategoryId) {
	const requestURL = `${config.apiURL}/expense_categories/${expenseCategoryId}/`;
	const response = await axios.delete(requestURL);

	return response;
}

export async function updateExpenseCategory({ expenseCategoryId, data }) {
	const requestURL = `${config.apiURL}/expense_categories/${expenseCategoryId}/`;
	const response = await axios.put(requestURL, data);

	return response;
}

export async function createExpense(data) {
	const requestURL = `${config.apiURL}/expenses/`;
	const response = await axios.post(requestURL, data);

	return response;
}

export async function deleteExpense(expenseId) {
	const requestURL = `${config.apiURL}/expenses/${expenseId}/`;
	const response = await axios.delete(requestURL);

	return response;
}

export async function updateExpense({ expenseId, data }) {
	const requestURL = `${config.apiURL}/expenses/${expenseId}/`;
	const response = await axios.put(requestURL, data);

	return response;
}