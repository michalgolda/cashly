const config = {
  apiURL: process.env.REACT_APP_API_URL,
  reactQueryDevtools: JSON.parse(
    process.env.REACT_APP_REACT_QUERY_DEVTOOLS.toLowerCase(),
  ),
};

export default config;
