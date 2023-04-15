import { render, screen } from '@testing-library/react'

import PageMain from './PageMain'

describe('PageMain component tests', () => {
    it('renders a component without crashing', () => {
        render(<PageMain />)
        const pageMain = screen.getByTestId('pagemain-component')
        expect(pageMain).toBeInTheDocument()
    })
})
