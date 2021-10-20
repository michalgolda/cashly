import { ThemeProvider } from "styled-components";
import { theme } from "../styles";

const withTheme = (Component) => {
    return (
        <ThemeProvider theme={theme}>
            <Component />
        </ThemeProvider>
    );
}

export default withTheme;