import Skeleton from '@/components/Skeleton/Skeleton'
import { defaultCurrencyFormat } from '@/utils/defaultCurrencyFormat'

import TotalAmountText from '../TotalAmountText'
import Widget from '../Widget/Widget'
import { useGetTotalAmountOfExpensesQuery } from './useGetTotalAmountOfExpensesQuery'

export default function TotalAmountOfExpensesWidget() {
    const { isLoading, isError, data } = useGetTotalAmountOfExpensesQuery()

    return (
        <Widget title="Suma wydatków">
            {isLoading || isError ? (
                <Skeleton height={8} width={128} />
            ) : (
                <TotalAmountText>
                    {defaultCurrencyFormat.format(data.value)}
                </TotalAmountText>
            )}
        </Widget>
    )
}
