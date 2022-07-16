<<<<<<< HEAD:cashly_web/src/pages/Analytics/ExpensesByCategoryWidget/Chart/CustomTooltip/CustomTooltip.js
import { defaultCurrencyFormat } from "@/utils";
import Tooltip from "@/pages/Analytics/Tooltip/Tooltip";

export default function CustomTooltip({ active, payload, label }) {
  return !(active && payload && payload.length) ? null : (
    <Tooltip
      label={label ? label : "Brak kategorii"}
      value={defaultCurrencyFormat.format(payload[0].value)}
    />
=======
import { useState } from "react";
import styled from "styled-components";

const StyledTooltip = styled.div`
  padding: 15px;
  border-radius: 2px;
  background-color: #fff;
  border: 1px solid ${({ theme }) => theme.colors.gray400};
`;

const StyledLabel = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.h5};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
`;

const StyledValue = styled.p`
  color: ${({ theme }) => theme.colors.blue400};
  font-size: ${({ theme }) => theme.fontSizes.h5};
`;

export default function TooltipContent({
  active,
  payload,
  label,
  labelFormatter,
  valueFormatter,
}) {
  const [value, setValue] = useState(null);

  const hidden = !(active && payload && payload.length);
  if (!hidden) setValue(payload[0].value);

  return hidden ? null : (
    <StyledTooltip>
      <StyledLabel>
        {labelFormatter ? labelFormatter(label) : label}
      </StyledLabel>
      <StyledValue>
        {valueFormatter ? valueFormatter(value) : value}
      </StyledValue>
    </StyledTooltip>
>>>>>>> f67a1c4 (refactor: remove repeated code by creating new 'TooltipContent' component):cashly_web/src/pages/Analytics/TooltipContent/TooltipContent.js
  );
}
