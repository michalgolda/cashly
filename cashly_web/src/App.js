import { ThemeProvider } from "styled-components";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider as NiceModalProvider } from "@ebay/nice-modal-react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import config from "./config";
import routes from "./routes";
import { Layout } from "./components";
import { theme, GlobalStyle } from "./styles";


const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <NiceModalProvider>
                    <GlobalStyle />
                    <Router>    
                        <Layout>
                            <Switch>
                                {routes.map(({ path, exact, component }, index) => (
                                    <Route 
                                        key={index}
                                        path={path} 
                                        exact={exact}
                                        component={component} 
                                    />
                                ))}
                            </Switch>
                        </Layout>
                    </Router>
                </NiceModalProvider>
            </ThemeProvider>
            {config.reactQueryDevtools && <ReactQueryDevtools />}
        </QueryClientProvider>
    );
}

export default App;