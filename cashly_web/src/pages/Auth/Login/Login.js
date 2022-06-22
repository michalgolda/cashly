import AuthLayout from "../AuthLayout/AuthLayout";
import AuthBottomText from "../AuthBottomText/AuthBottomText";
import LoginForm from "./LoginForm/LoginForm";

export default function Login() {
    return (
        <AuthLayout>
            <h2>Zaloguj się</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <LoginForm />
            <AuthBottomText>Jeszcze nie posiadasz konta? <a href="/register">Zarejestruj się</a></AuthBottomText>
        </AuthLayout>
    );
}