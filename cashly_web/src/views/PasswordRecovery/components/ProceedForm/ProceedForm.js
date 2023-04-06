import Button from '@/components/Button/Button'
import Input from '@/components/Input/Input'
import BaseForm from '@/views/Auth/components/BaseForm/BaseForm'

import { useForm } from './useForm'

export default function ProceedForm() {
    const form = useForm()

    return (
        <BaseForm onSubmit={form.handleSubmit} noValidate>
            <Input
                name="password"
                labelText="Nowe hasło"
                type="password"
                onChange={form.handleChange}
                value={form.values.password}
                error={form.touched.password && form.errors.password}
                fullWidth
            />
            <Input
                name="confirmPassword"
                labelText="Powtórz hasło"
                type="password"
                onChange={form.handleChange}
                value={form.values.confirmPassword}
                error={
                    form.touched.confirmPassword && form.errors.confirmPassword
                }
                fullWidth
            />
            <Button type="submit">Zmień hasło</Button>
        </BaseForm>
    )
}
