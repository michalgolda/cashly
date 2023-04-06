import Button from '@/components/Button/Button'
import Input from '@/components/Input/Input'

import BaseForm from '../../../components/BaseForm/BaseForm'
import { useForm } from './useForm'

export default function RegisterForm() {
    const form = useForm()

    return (
        <BaseForm onSubmit={form.handleSubmit}>
            <Input
                name="email"
                type="email"
                onChange={form.handleChange}
                value={form.values.email}
                error={form.touched.email && form.errors.email}
                labelText="E-Mail"
                fullWidth
            />
            <Input
                name="password"
                type="password"
                onChange={form.handleChange}
                value={form.values.password}
                error={form.touched.password && form.errors.password}
                labelText="Hasło"
                fullWidth
            />
            <Input
                name="confirmPassword"
                type="password"
                onChange={form.handleChange}
                value={form.values.confirmPassword}
                error={
                    form.touched.confirmPassword && form.errors.confirmPassword
                }
                labelText="Powtórz hasło"
                fullWidth
            />
            <Button type="submit" fullWidth>
                Zarejestruj się
            </Button>
        </BaseForm>
    )
}
