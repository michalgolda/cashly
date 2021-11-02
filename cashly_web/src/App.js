import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "styled-components";
import { theme, GlobalStyle } from "./styles";
import { Router } from "./components";
import routes from "./routes";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <GlobalStyle />
                <Router routes={routes} />
            </ThemeProvider>
        </QueryClientProvider>
    );
}

export default App;