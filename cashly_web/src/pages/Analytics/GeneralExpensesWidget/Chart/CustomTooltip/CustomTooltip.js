import { defaultCurrencyFormat } from "@/utils";
import Tooltip from "@/pages/Analytics/Tooltip/Tooltip";

export default function CustomTooltip({ active, payload, label }) {
  return !(active && payload && payload.length) ? null : (
    <Tooltip
      label={label}
      value={defaultCurrencyFormat.format(payload[0].value)}
    />
  );
}
