import moment from 'moment'

export const getPeriod = (unit, subtractAmount, subtractUnit) => {
    return {
        unit,
        end_date: moment().format('YYYY-MM-DD'),
        start_date: moment()
            .subtract(subtractAmount, subtractUnit)
            .format('YYYY-MM-DD'),
    }
}
