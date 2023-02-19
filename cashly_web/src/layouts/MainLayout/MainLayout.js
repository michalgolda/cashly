import Footer from '@/components/Footer/Footer'
import Sidebar from '@/components/Sidebar/Sidebar'

import { StyledContent, StyledMain } from './MainLayout.styled'

export default function MainLayout({ children, ...props }) {
    return (
        <StyledMain {...props}>
            <Sidebar />
            <StyledContent>
                {children}
                <Footer />
            </StyledContent>
        </StyledMain>
    )
}
