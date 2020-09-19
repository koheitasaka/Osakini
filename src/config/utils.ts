import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

export const getToday = () => {
  dayjs.extend(utc);
  return dayjs
    .utc()
    .local()
    .format('YYYY/MM/DD (ddd)');
};
