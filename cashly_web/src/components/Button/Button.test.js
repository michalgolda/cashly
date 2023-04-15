import { render, screen } from '@testing-library/react'

import Button from './Button'

describe('Button component tests', () => {
    it('renders default variant of a button without crashing', () => {
        render(<Button>Click me!</Button>)
        const button = screen.getByRole('button')
        expect(button).toBeInTheDocument()
        expect(button).toHaveTextContent('Click me!')
    })

    it('renders primaryOutlined variant of a button without crashing', () => {
        render(<Button variant="primaryOutlined">Click me!</Button>)
        const button = screen.getByRole('button')
        expect(button).toBeInTheDocument()
        expect(button).toHaveTextContent('Click me!')
    })

    it('renders text variant of a button without crashing', () => {
        render(<Button variant="text">Click me!</Button>)
        const button = screen.getByRole('button')
        expect(button).toBeInTheDocument()
        expect(button).toHaveTextContent('Click me!')
    })
})
