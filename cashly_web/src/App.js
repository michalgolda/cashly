import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Provider as NiceModalProvider } from '@ebay/nice-modal-react';
import { ThemeProvider } from 'styled-components';

import { AppToastContainer, AuthRedirect, AuthRequired } from '@/components';
import config from '@/config';
import { SessionProvider } from '@/contexts/session';
import { queryClient } from '@/helpers/queryClient';
import {
  Analytics,
  Categories,
  Expenses,
  Login,
  NotFound,
  PasswordRecovery,
  Register,
  VerifyEmail,
} from '@/pages';
import { GlobalStyle, theme } from '@/styles';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <AppToastContainer />
        <NiceModalProvider>
          <BrowserRouter>
            <SessionProvider>
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
                <Route path="/verify/email" element={<VerifyEmail />} />
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
                <Route
                  path="/passwordrecovery"
                  element={
                    <AuthRedirect>
                      <PasswordRecovery />
                    </AuthRedirect>
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
