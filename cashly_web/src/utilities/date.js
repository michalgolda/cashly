export function dateToISOString(date) {
    const fullYear = date.getFullYear();
    const month = date.getMonth() + 1;
    const dayOfMonth = date.getDate();

    return `${fullYear}-${month}-${dayOfMonth}`;
}