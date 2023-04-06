import Button from '@/components/Button/Button'
import Input from '@/components/Input/Input'
import BaseForm from '@/views/Auth/components/BaseForm/BaseForm'

import { useForm } from './useForm'

export default function RequestForm() {
    const form = useForm()

    return (
        <BaseForm onSubmit={form.handleSubmit} noValidate>
            <Input
                type="email"
                name="email"
                onChange={form.handleChange}
                value={form.values.email}
                error={form.touched.email && form.errors.email}
                labelText="E-Mail"
                fullWidth
            />
            <Button type="submit">Wyślij link</Button>
        </BaseForm>
    )
}
