import Skeleton from '@/components/Skeleton/Skeleton'

import TotalAmountText from '../TotalAmountText'
import Widget from '../Widget/Widget'
import { useGetCountAllExpenseCategoriesQuery } from './useGetCountAllExpenseCategoriesQuery'

export default function CountAllExpenseCategoriesWidget() {
    const { isLoading, isError, data } = useGetCountAllExpenseCategoriesQuery()

    if (isLoading || isError)
        return (
            <Widget title="Liczba kategorii">
                <Skeleton height={8} width={128} />
            </Widget>
        )

    return (
        <Widget title="Liczba kategorii">
            <TotalAmountText>{data.value}</TotalAmountText>
        </Widget>
    )
}
