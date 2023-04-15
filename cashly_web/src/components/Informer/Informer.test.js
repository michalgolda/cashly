import { render, screen, within } from '@testing-library/react'

import Informer from './Informer'

describe('Informer component tests', () => {
    it('renders a component without crashing', () => {
        render(
            <Informer
                text="The informer component"
                bottomElement={<span>Bottom component</span>}
                illustration={<img src="/logo.svg" alt="illustration image" />}
            />
        )
        const informer = screen.getByTestId('informer-component')
        expect(informer).toBeInTheDocument()
        expect(
            within(informer).getByText('The informer component')
        ).toBeInTheDocument()
        expect(
            within(informer).getByText('Bottom component')
        ).toBeInTheDocument()
        expect(
            within(informer).getByAltText('illustration image')
        ).toBeInTheDocument()
    })
})
