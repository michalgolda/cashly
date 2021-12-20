import { 
	Line, 
	YAxis, 
	XAxis, 
	Tooltip,
	LineChart,
	ResponsiveContainer 
 } from "recharts";
 import VoidIllustration from "../../../assets/void.svg";

import Widget from "../Widget/Widget";
import { Skeleton, Informer } from "../../../components";


export default function RespectiveExpenseWidget({ data, isLoading, isEmpty }) {
	return (
		<>
			{isLoading ? (
				<Skeleton height={400} />
			) : (
				<>
				   {isEmpty ? ( 
					   <Informer
							illustrationSource={VoidIllustration}
							illustrationStyles={{maxWidth: "128px"}}
							text={`
								Aktualnie nie dodałeś/aś żadnych wydatków, 
								przez co nie jest możliwe wyświetlenie wykresów
							`} 
						/>
				    ) : (
					<Widget>
						<ResponsiveContainer width="100%" height={400}>
							<LineChart
								data={data}
								margin={{right: 25}} 
							>
								<XAxis dataKey="day" dy={8} />
								<YAxis allowDecimals={true} dx={-8} />
								<Tooltip 
									formatter={(value) => (
										[`${value} PLN`, 'Wydatki']
									)}
								/>
								<Line 
									type="monotone"
									dataKey="value" 
									strokeWidth={2}
									stroke="#582eff" 
								/>
							</LineChart>
						</ResponsiveContainer>
					</Widget>
				   )} 
				</>
			)}
		</>
	)
}

