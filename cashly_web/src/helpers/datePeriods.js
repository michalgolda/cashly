import moment from 'moment';

export const getPeriod = (unit, subtractAmount, subtractUnit) => {
  return {
    unit,
    end_date: moment().format('YYYY-MM-DD'),
    start_date: moment()
      .subtract(subtractAmount, subtractUnit)
      .format('YYYY-MM-DD'),
  };
};

export const periods = {
  lastSevenDays: getPeriod('D', 7, 'd'),
  lastFourWeeks: getPeriod('D', 4, 'w'),
  lastThreeMonths: getPeriod('W', 3, 'M'),
  lastTwentyMonths: getPeriod('M', 12, 'M'),
};
