import styled from "styled-components";
import {
  Line,
  XAxis,
  Tooltip,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import { defaultCurrencyFormat } from "@/helpers/currencyFormat";
import TooltipContent from "@/pages/Analytics/TooltipContent/TooltipContent";

const StyledWrapper = styled.div`
  width: 100%;
  height: auto;
`;

const StyledTicks = styled.div`
  display: flex;
  margin-left: 15px;
  margin-right: 15px;
  align-content: center;
  justify-content: space-between;
`;

const StyledTick = styled.p`
  color: ${({ theme }) => theme.colors.gray600};
`;

export default function Chart({ data }) {
  const firstTick = data[0];
  const lastTick = data[data.length - 1];

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
                valueFormatter={(value) => defaultCurrencyFormat.format(value)}
              />
            }
          />
          <Line dot={false} dataKey="value" strokeWidth={2} stroke="#582eff" />
          <ReferenceLine y={0} stroke="#a5a5a5" />
        </LineChart>
      </ResponsiveContainer>
      <StyledTicks>
        <StyledTick>{firstTick.key}</StyledTick>
        <StyledTick>{lastTick.key}</StyledTick>
      </StyledTicks>
    </StyledWrapper>
  );
}
