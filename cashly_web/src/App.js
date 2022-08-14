import { ThemeProvider } from "styled-components";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClientProvider } from "react-query";
import { Provider as NiceModalProvider } from "@ebay/nice-modal-react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import config from "@/config";
import {
  Analytics,
  Categories,
  Expenses,
  Login,
  NotFound,
  Register,
} from "@/pages";
import { AuthRequired, AuthRedirect } from "@/components";
import { SessionProvider } from "@/contexts/session";
import { theme, GlobalStyle } from "@/styles";
import { queryClient } from "@/helpers/queryClient";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <NiceModalProvider>
          <BrowserRouter>
            <SessionProvider>
              <GlobalStyle />
              <Routes>
                <Route index element={<Navigate to="/expenses" replace />} />
                <Route
                  path="/expenses"
                  element={
                    <AuthRequired>
                      <Expenses />
                    </AuthRequired>
                  }
                />
                <Route
                  path="/login"
                  element={
                    <AuthRedirect>
                      <Login />
                    </AuthRedirect>
                  }
                />
                <Route
                  path="/register"
                  element={
                    <AuthRedirect>
                      <Register />
                    </AuthRedirect>
                  }
                />
                <Route
                  path="/analytics"
                  element={
                    <AuthRequired>
                      <Analytics />
                    </AuthRequired>
                  }
                />
                <Route
                  path="/categories"
                  element={
                    <AuthRequired>
                      <Categories />
                    </AuthRequired>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </SessionProvider>
          </BrowserRouter>
        </NiceModalProvider>
      </ThemeProvider>
      {config.reactQueryDevtools && <ReactQueryDevtools />}
    </QueryClientProvider>
  );
}

export default App;
