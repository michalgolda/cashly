import { render, screen } from '@testing-library/react'

import Logo from './Logo'

describe('Logo component tests', () => {
    it('renders a component without crashing', () => {
        render(<Logo />)
        const logo = screen.getByTestId('logo-component')
        expect(logo).toBeInTheDocument()
    })
})
