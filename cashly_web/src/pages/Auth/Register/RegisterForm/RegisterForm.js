import AuthForm from "../../AuthForm/AuthForm";
import { Input, Button } from "../../../../components";

export default function RegisterForm() {
    return (
        <AuthForm>
            <Input 
                name="email"
                type="email"
                labelText="E-Mail"
                fullWidth
            />
            <Input 
                name="password"
                type="password"
                labelText="Hasło"
                fullWidth
            />
            <Input 
                name="repeatedPassword"
                type="password"
                labelText="Powtórz hasło"
                fullWidth
            />
            <Button type="submit" fullWidth>Zarejestruj się</Button>
        </AuthForm>
    )
}