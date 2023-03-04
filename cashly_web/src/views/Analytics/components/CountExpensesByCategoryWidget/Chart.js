import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts'

import TooltipContent from '../TooltipContent/TooltipContent'

export default function Chart({ data }) {
    const tickFormatter = (tick) => {
        return tick ? tick : 'Brak kategorii'
    }

    return (
        <ResponsiveContainer width="99%" height={256}>
            <BarChart
                data={data}
                margin={{
                    top: 15,
                    right: 15,
                    bottom: 15,
                    left: 15,
                }}
            >
                <XAxis
                    dy={15}
                    interval={0}
                    dataKey="key"
                    fill="#858585"
                    stroke="#858585"
                    tickLine={false}
                    tick={{ fill: '#858585' }}
                    tickFormatter={tickFormatter}
                />
                <Tooltip
                    cursor={false}
                    content={
                        <TooltipContent
                            labelFormatter={(label) =>
                                label ? label : 'Brak kategorii'
                            }
                        />
                    }
                />
                <Bar barSize={32} fill="#582eff" dataKey="value" />
            </BarChart>
        </ResponsiveContainer>
    )
}
