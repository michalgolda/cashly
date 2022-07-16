import { useEffect, useState } from "react";
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
  useEffect(() => {
    if (!hidden) setValue(payload[0].value);
  }, []);

  return hidden ? null : (
    <StyledTooltip>
      <StyledLabel>
        {labelFormatter ? labelFormatter(label) : label}
      </StyledLabel>
      <StyledValue>
        {valueFormatter ? valueFormatter(value) : value}
      </StyledValue>
    </StyledTooltip>
  );
}
