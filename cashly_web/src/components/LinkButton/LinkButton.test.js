import { render, screen } from '@testing-library/react'

import LinkButton from './LinkButton'

describe('LinkButton component tests', () => {
    it('renders a component without crashing', () => {
        render(<LinkButton href="https://google.com">Click me!</LinkButton>)
        const linkButton = screen.getByTestId('linkbutton-component')
        expect(linkButton).toBeInTheDocument()
    })
})
