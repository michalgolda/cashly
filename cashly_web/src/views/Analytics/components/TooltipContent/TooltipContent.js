import { useEffect, useState } from 'react'

import {
    StyledLabel,
    StyledTooltip,
    StyledValue,
} from './TooltipContent.styled'

export default function TooltipContent({
    active,
    payload,
    label,
    labelFormatter,
    valueFormatter,
}) {
    const [value, setValue] = useState(null)

    const hidden = !(active && payload && payload.length)
    useEffect(() => {
        if (!hidden) setValue(payload[0].value)
    }, [payload])

    return hidden ? null : (
        <StyledTooltip>
            <StyledLabel>
                {labelFormatter ? labelFormatter(label) : label}
            </StyledLabel>
            <StyledValue>
                {valueFormatter ? valueFormatter(value) : value}
            </StyledValue>
        </StyledTooltip>
    )
}
