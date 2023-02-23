import {
    Line,
    LineChart,
    ReferenceLine,
    ResponsiveContainer,
    Tooltip,
    XAxis,
} from 'recharts'
import styled from 'styled-components'

import { defaultCurrencyFormat } from '@/utils/defaultCurrencyFormat'

import TooltipContent from '../TooltipContent/TooltipContent'

const StyledWrapper = styled.div`
    width: 100%;
    height: auto;
`

const StyledTicks = styled.div`
    display: flex;
    margin-left: 15px;
    margin-right: 15px;
    align-content: center;
    justify-content: space-between;
`

const StyledTick = styled.p`
    color: ${({ theme }) => theme.colors.gray600};
`

export default function Chart({ data, labelFormatter }) {
    const firstTick = data[0]
    const lastTick = data[data.length - 1]

    return (
        <StyledWrapper>
            <ResponsiveContainer width="99%" height={256}>
                <LineChart
                    data={data}
                    margin={{
                        top: 15,
                        right: 15,
                        bottom: 15,
                        left: 15,
                    }}
                >
                    <XAxis dataKey="key" hide={true} interval={0} />
                    <Tooltip
                        content={
                            <TooltipContent
                                labelFormatter={labelFormatter}
                                valueFormatter={(value) =>
                                    defaultCurrencyFormat.format(value)
                                }
                            />
                        }
                    />
                    <Line
                        dot={false}
                        dataKey="value"
                        strokeWidth={2}
                        stroke="#582eff"
                    />
                    <ReferenceLine y={0} stroke="#a5a5a5" />
                </LineChart>
            </ResponsiveContainer>
            <StyledTicks>
                <StyledTick>{labelFormatter(firstTick.key)}</StyledTick>
                <StyledTick>{labelFormatter(lastTick.key)}</StyledTick>
            </StyledTicks>
        </StyledWrapper>
    )
}