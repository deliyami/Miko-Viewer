import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isBetween);
dayjs.extend(isSameOrBefore);

dayjs.tz.setDefault('Asia/Tokyo');

const FORMAT = {
  YMD: 'YYYY/MM/DD',
  YMDHM: 'YYYY/MM/DD A hh:mm',
  YMDHMS: 'YYYY/MM/DD A hh:mm:ss',
  HMS: 'A hh:mm:ss',
  ISO8601NoZ: 'YYYY-MM-DDThh:mm:00',
};

export const convertDate = (data: dayjs.ConfigType, format: keyof typeof FORMAT = 'YMD') => {
  return dayjs(data).format(FORMAT[format]);
};

export const convertDateUTC = (data: dayjs.ConfigType, format: keyof typeof FORMAT = 'YMD') => {
  return dayjs.utc(data).format(FORMAT[format]);
};

export const dayIsBetween = (day1: dayjs.ConfigType, day2: dayjs.ConfigType) => dayjs().isBetween(day1, day2);
