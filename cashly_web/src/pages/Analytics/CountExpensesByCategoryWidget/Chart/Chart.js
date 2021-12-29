import { Bar, XAxis, BarChart, Tooltip, ResponsiveContainer } from "recharts";

import CustomTooltip from "./CustomTooltip/CustomTooltip";


export default function Chart({ data }) {
    const tickFormatter = (tick) => {
        return tick ? tick : "Bez kategorii";
    };

     return (
        <ResponsiveContainer
            width="99%"
            height={256}
        >
            <BarChart
                data={data}
                margin={{
                    top: 15,
                    right: 15,
                    bottom: 15,
                    left: 15
                }}
            >
                <XAxis
                    dy={15}
                    interval={0}
                    dataKey="key"
                    tickLine={false}
                    fill="#a5a5a5"
                    tick={{fill: "#a5a5a5"}}
                    tickFormatter={tickFormatter}
                />
                <Tooltip
                    cursor={false}
                    content={<CustomTooltip />}
                />
                <Bar
                    barSize={32}
                    fill="#582eff"
                    dataKey="value"
                />
            </BarChart>
        </ResponsiveContainer>
    );
}