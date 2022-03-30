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
};

const convertDate = (data: dayjs.ConfigType, format: keyof typeof FORMAT = 'YMD') => {
  return dayjs(data).format(FORMAT[format]);
};

// format을 하면 리턴되는 값이 string이 되서 dayjs 함수를 사용못함.
const noFormatDate = (data: dayjs.ConfigType) => {
  return dayjs(data);
};

export { convertDate, noFormatDate };
