import AuthLayout from "../AuthLayout/AuthLayout";
import AuthBottomText from "../AuthBottomText/AuthBottomText";
import LoginForm from "./LoginForm/LoginForm";
import { Page } from "../../../components";

export default function Login() {
  return (
    <Page title="Cashly - Logowanie">
      <AuthLayout>
        <h2>Zaloguj się</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <LoginForm />
        <AuthBottomText>
          Jeszcze nie posiadasz konta? <a href="/register">Zarejestruj się</a>
        </AuthBottomText>
      </AuthLayout>
    </Page>
  );
}
