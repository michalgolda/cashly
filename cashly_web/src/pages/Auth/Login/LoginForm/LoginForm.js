import AuthForm from "../../AuthForm/AuthForm";
import { Input, Button } from "../../../../components";

export default function LoginForm() {
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
            <Button type="submit" fullWidth>Zaloguj się</Button>
        </AuthForm>
    )
}