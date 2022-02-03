import axios from 'axios';
import config from './config';


export async function createExpenseCategory(data) {
	const requestURL = `${config.apiURL}/expense_categories/`;
	return await axios.post(requestURL, data);
}

export async function deleteExpenseCategory(expenseCategoryId) {
	const requestURL = `${config.apiURL}/expense_categories/${expenseCategoryId}/`;
	return await axios.delete(requestURL);
}

export async function updateExpenseCategory({ expenseCategoryId, data }) {
	const requestURL = `${config.apiURL}/expense_categories/${expenseCategoryId}/`;
	return await axios.put(requestURL, data);
}

export async function createExpense(data) {
	const requestURL = `${config.apiURL}/expenses/`;
	return await axios.post(requestURL, data);
}

export async function deleteExpense(expenseId) {
	const requestURL = `${config.apiURL}/expenses/${expenseId}/`;
	return await axios.delete(requestURL);
}

export async function updateExpense({ expenseId, data }) {
	const requestURL = `${config.apiURL}/expenses/${expenseId}/`;
	return await axios.put(requestURL, data);
}

export async function exportExpenses({ fileFormat }) {
	const requestURL = `${config.apiURL}/expenses/export?file_format=${fileFormat}`;
	return await axios.get(requestURL);
}