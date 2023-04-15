import { render, screen } from '@testing-library/react'

import { withTheme } from '@/utils/withTheme'

import Skeleton from './Skeleton'

describe('Skeleton component tests', () => {
    it('renders circle type a component without crashing', () => {
        render(withTheme(<Skeleton type="circle" width={32} height={32} />))
        const skeleton = screen.getByTestId('skeleton-component')
        expect(skeleton).toBeInTheDocument()
    })

    it('renders rectangle type a component without crashing', () => {
        render(withTheme(<Skeleton type="rectangle" width={100} height={50} />))
        const skeleton = screen.getByTestId('skeleton-component')
        expect(skeleton).toBeInTheDocument()
    })
})
