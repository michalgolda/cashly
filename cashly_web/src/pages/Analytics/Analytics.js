import styled from "styled-components";

import { Page } from "../../components";
import AnalyticsPageHeader from "./AnalyticsPageHeader/AnalyticsPageHeader";
import RespectiveExpenseWidget from "./RespectiveExpenseWidget/RespectiveExpenseWidget";


const StyledWrapper = styled.div`padding: 64px;`;

const StyledContainer = styled.div`
	width: 100%;
	margin: 0 auto;
	max-width: 1024px;
`;

export default function Analytics() {
	const data = [
		{"day": "PON", "value": 50},
		{"day": "WTO", "value": 100},
		{"day": "ŚRO", "value": 500},
		{"day": "CZW", "value": 300},
		{"day": "PIĄ", "value": 150},
		{"day": "SOB", "value": 500},
		{"day": "NIE", "value": 500}
	];

	return (
		<Page title="Cashly - Analityka">
			<AnalyticsPageHeader />

			<StyledWrapper>
				<StyledContainer>
					<RespectiveExpenseWidget 
						data={data}
						isEmpty={false}
						isLoading={false} 
					/>
				</StyledContainer>
			</StyledWrapper>
		</Page>
	);
}