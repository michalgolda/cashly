import { theme, GlobalStyle } from "./styles";
import { ThemeProvider } from "styled-components";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider as NiceModalProvider } from "@ebay/nice-modal-react";

import routes from "./routes";
import config from "./config";
import { Router } from "./components";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <NiceModalProvider>
                    <GlobalStyle />
                    <Router routes={routes} />
                </NiceModalProvider>
            </ThemeProvider>
            {config.reactQueryDevtools && <ReactQueryDevtools />}
        </QueryClientProvider>
    );
}

export default App;