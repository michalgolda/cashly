import { render, screen } from '@testing-library/react'

import { withTheme } from '@/utils/withTheme'

import Sidebar from './Sidebar'

jest.mock('next/router', () => ({
    useRouter() {
        return {
            pathname: '',
        }
    },
}))

describe('Sidebar component tests', () => {
    it('renders a component without crashing', () => {
        render(withTheme(<Sidebar userEmail="test@test.pl" />))
        const sidebar = screen.getByTestId('sidebar-component')
        expect(sidebar).toBeInTheDocument()
    })
})
