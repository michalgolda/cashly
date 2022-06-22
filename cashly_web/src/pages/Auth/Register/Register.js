import AuthLayout from "../AuthLayout/AuthLayout";
import AuthBottomText from "../AuthBottomText/AuthBottomText";
import RegisterForm from "./RegisterForm/RegisterForm";

export default function Register() {
    return (
        <AuthLayout>
            <h2>Utwórz nowe konto</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <RegisterForm />
            <AuthBottomText>Posiadasz konto ? <a href="/login">Zaloguj się</a></AuthBottomText>
        </AuthLayout>
    );
}