import { useEffect, useState } from 'react';

import * as S from './TooltipContent.styled';

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
  }, [payload]);

  return hidden ? null : (
    <S.Tooltip>
      <S.Label>{labelFormatter ? labelFormatter(label) : label}</S.Label>
      <S.Value>{valueFormatter ? valueFormatter(value) : value}</S.Value>
    </S.Tooltip>
  );
}
