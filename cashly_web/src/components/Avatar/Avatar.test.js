import { render, screen } from '@testing-library/react'

import Avatar from './Avatar'

describe('Avatar component tests', () => {
    it('renders a component without crashing', () => {
        render(<Avatar letter="M" />)
        const avatar = screen.getByTestId('avatar')
        expect(avatar).toBeInTheDocument()
        expect(avatar.firstElementChild).toHaveTextContent('M')
    })
})
