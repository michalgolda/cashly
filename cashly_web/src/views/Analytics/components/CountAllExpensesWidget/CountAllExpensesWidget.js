import Skeleton from '@/components/Skeleton/Skeleton'

import TotalAmountText from '../TotalAmountText'
import Widget from '../Widget/Widget'
import { useGetCountAllExpensesQuery } from './useGetCountAllExpensesQuery'

export default function CountAllExpensesWidget() {
    const { isLoading, isError, data } = useGetCountAllExpensesQuery()

    if (isLoading || isError)
        return (
            <Widget title="Liczba wydatków">
                <Skeleton height={8} width={128} />
            </Widget>
        )

    return (
        <Widget title="Liczba wydatków">
            <TotalAmountText>{data.value}</TotalAmountText>
        </Widget>
    )
}
