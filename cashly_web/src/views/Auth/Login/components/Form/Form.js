import Button from '@/components/Button/Button'
import Input from '@/components/Input/Input'

import BaseForm from '../../../components/BaseForm/BaseForm'
import { useForm } from './useForm'

export default function Form() {
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
            <Button type="submit" fullWidth>
                Zaloguj się
            </Button>
        </BaseForm>
    )
}
