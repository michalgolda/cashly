import Input from '@/components/Input/Input'
import { periods } from '@/utils/periods'

import { useDatePeriod } from './hooks/useDatePeriod'

export default function DatePeriodSelect() {
    const { setCurrentPeriod } = useDatePeriod()
    const handleChangePeriod = (e) => {
        const periodKey = e.target.value
        const period = periods[periodKey]
        setCurrentPeriod(period)
    }

    return (
        <Input
            as="select"
            defaultValue="lastTwentyMonths"
            onChange={handleChangePeriod}
            fullWidth
        >
            <option value="lastSevenDays">Ostatnie 7 dni</option>
            <option value="lastFourWeeks">Ostatnie 4 tygodnie</option>
            <option value="lastThreeMonths">Ostatnie 3 miesiące</option>
            <option value="lastTwentyMonths">Ostatnie 12 miesięcy</option>
        </Input>
    )
}
