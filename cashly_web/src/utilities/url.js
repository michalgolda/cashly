export function buildURL(baseURLString, queryParams) {
    const url = new URL(baseURLString);

    for (let queryParamKey in queryParams) {
        const queryParamValue = queryParams[queryParamKey];

        url.searchParams.append(queryParamKey, queryParamValue);
    }

    return url.toString();
}