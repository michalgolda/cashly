import { render, screen, within } from '@testing-library/react'

import { withTheme } from '@/utils/withTheme'

import Input from './Input'

describe('Input component tests', () => {
    it('renders a component without crashing', () => {
        render(
            withTheme(
                <Input
                    labelText="A label text"
                    type="text"
                    error="An error message"
                />
            )
        )
        const inputContainer = screen.getByTestId('input-component')
        expect(inputContainer).toBeInTheDocument()
        expect(
            within(inputContainer).getByText('A label text')
        ).toBeInTheDocument()
        expect(
            within(inputContainer).getByTestId('input-element')
        ).toBeInTheDocument()
        expect(
            within(inputContainer).getByText('An error message')
        ).toBeInTheDocument()
    })
})
