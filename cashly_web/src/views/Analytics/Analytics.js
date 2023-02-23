import PageMain from '@/components/PageMain/PageMain'
import MainLayout from '@/layouts/MainLayout/MainLayout'

import { DatePeriodProvider } from './components/DatePeriodSelect/context'
import PageHeader from './components/PageHeader/PageHeader'
import WidgetList from './components/WidgetList/WidgetList'

export default function Analytics() {
    return (
        <MainLayout>
            <DatePeriodProvider>
                <PageHeader />
                <PageMain>
                    <WidgetList />
                </PageMain>
            </DatePeriodProvider>
        </MainLayout>
    )
}
