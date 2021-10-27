import { ThemeProvider } from "styled-components";
import { theme, GlobalStyle } from "./styles";
import { Router } from "./components";
import routes from "./routes";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Router routes={routes} />
        </ThemeProvider>
    );
}

export default App;